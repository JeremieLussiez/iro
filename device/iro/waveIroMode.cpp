#include "./waveIroMode.h"
#include "./iroModesManager.h"

void WaveIroMode::animate(Adafruit_NeoPixel *pixels) {
  if (this->loopDelay > LOOP_DELAY / 3) {
    this->loopDelay = 0;
    this->currentForegroundColor = lerpColor(this->currentForegroundColor, this->targetForegroundColor);
    this->currentBackgroundColor = lerpColor(this->currentBackgroundColor, this->targetBackgroundColor);
    for (int i = 0; i < NUMPIXELS; i++) {
      pixels->setPixelColor(i, pixels->Color(this->currentBackgroundColor.r, this->currentBackgroundColor.g, this->currentBackgroundColor.b));
    }
    pixels->setPixelColor(this->waveIndex, pixels->Color(this->currentForegroundColor.r, this->currentForegroundColor.g, this->currentForegroundColor.b));
    Color trail = lerpColor(this->currentForegroundColor, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
    pixels->setPixelColor((this->waveIndex - 1) % NUMPIXELS, pixels->Color(trail.r, trail.g, trail.b));
    for (int i = 2; i < 8; i++) {
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      trail = lerpColor(trail, this->currentBackgroundColor);
      pixels->setPixelColor((this->waveIndex - i) % NUMPIXELS, pixels->Color(trail.r, trail.g, trail.b));
    }
    pixels->show();
    this->waveIndex++;
  }
  this->loopDelay++;
}

WaveIroMode::WaveIroMode(IroModesManager *manager) {
  this->manager = manager;
  this->server = manager->server;
  this->manager->registerMode(this);
  ESP8266WebServer *server = manager->server;
  this->server->on("/api/wave", [&]() {
    this->server->sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    this->server->sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Color fc = {.r = 0, .g = 0, .b = 0};
    Color bc = {.r = 0, .g = 0, .b = 0};
    int canChangeMode = this->server->args() == 2 &&
                        this->server->argName(0) == "foreground" &&
                        sscanf(this->server->arg(0).c_str(), "r%dg%db%d", &fc.r, &fc.g, &fc.b) == 3 &&
                        checkColor(fc)
                        && this->server->argName(1) == "background" &&
                        sscanf(this->server->arg(1).c_str(), "r%dg%db%d", &bc.r, &bc.g, &bc.b) == 3 &&
                        checkColor(bc);

    if (canChangeMode) {
      this->manager->switchToMode(this);
      this->targetForegroundColor = fc;
      this->targetBackgroundColor = bc;
      String response = String("{foreground: {r:") + fc.r + ",g:" + fc.g + ",b:" + fc.b + "}, background: {r:" + bc.r + ",g:" + bc.g + ",b:" + bc.b + "}}";
      this->server->send(200, "application/json", response);
      return;
    } else {
      this->server->send(400, "application/json", String("{error: \"wrong parameters\", expected:\"r0-255g0-255b0-255\", received:\"") + this->server->arg(0) + "\", decoded:\"r:" + fc.r + ",g:" + fc.g + ",b:" + fc.b + "\"}");
      return;
    }
  });
}
