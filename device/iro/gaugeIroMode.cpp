#include "./gaugeIroMode.h"
#include "./iroModesManager.h"

bool checkValue(int value) {
  return value >= 0 && value <= NUMPIXELS;
}

void GaugeIroMode::animate(Adafruit_NeoPixel *pixels) {
  if (this->loopDelay > LOOP_DELAY / 3) {
    this->loopDelay = 0;
    if (!(areSameColor(this->currentForegroundColor, this->targetForegroundColor) && areSameColor(this->currentBackgroundColor, this->targetBackgroundColor) && this->currentValue == this->targetValue)) {
      this->currentForegroundColor = lerpColor(this->currentForegroundColor, this->targetForegroundColor);
      this->currentBackgroundColor = lerpColor(this->currentBackgroundColor, this->targetBackgroundColor);
      this->currentValue = lerp(this->currentValue, this->targetValue);
      if (this->currentValue > 0) {
        for (int i = 0; i < this->currentValue; i++) {
          pixels->setPixelColor(i, pixels->Color(this->currentForegroundColor.r, this->currentForegroundColor.g, this->currentForegroundColor.b));
        }
      } else {
        pixels->setPixelColor(0, pixels->Color(this->currentBackgroundColor.r, this->currentBackgroundColor.g, this->currentBackgroundColor.b));
      }
      for (int i = this->currentValue + 1; i < NUMPIXELS; i++) {
        pixels->setPixelColor(i, pixels->Color(this->currentBackgroundColor.r, this->currentBackgroundColor.g, this->currentBackgroundColor.b));
      }
      pixels->show();
    }
  }
  this->loopDelay++;
}

GaugeIroMode::GaugeIroMode(IroModesManager *manager) {
  this->manager = manager;
  this->server = manager->server;
  this->manager->registerMode(this);
  ESP8266WebServer *server = manager->server;
  this->server->on("/gauge", [&]() {
    this->server->sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    this->server->sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Color fc = {.r = 0, .g = 0, .b = 0};
    Color bc = {.r = 0, .g = 0, .b = 0};
    int value = 0;
    int canChangeMode = this->server->args() == 3 &&
                        this->server->argName(0) == "foreground" &&
                        sscanf(this->server->arg(0).c_str(), "r%dg%db%d", &fc.r, &fc.g, &fc.b) == 3 &&
                        checkColor(fc)
                        && this->server->argName(1) == "background" &&
                        sscanf(this->server->arg(1).c_str(), "r%dg%db%d", &bc.r, &bc.g, &bc.b) == 3 &&
                        checkColor(bc)
                        && this->server->argName(2) == "value" &&
                        sscanf(this->server->arg(2).c_str(), "%d", &value) == 1 &&
                        checkValue(value);

    if (canChangeMode) {
      this->manager->switchToMode(this);
      this->targetForegroundColor = fc;
      this->targetBackgroundColor = bc;
      this->targetValue = value;
      String response = String("{foreground: {r:") + fc.r + ",g:" + fc.g + ",b:" + fc.b + "}, background: {r:" + bc.r + ",g:" + bc.g + ",b:" + bc.b + "}}";
      this->server->send(200, "application/json", response);
      return;
    } else {
      this->server->send(400, "application/json", String("{error: \"wrong parameters\", expected:\"r0-255g0-255b0-255\", received:\"") + this->server->arg(0) + "\", decoded:\"r:" + fc.r + ",g:" + fc.g + ",b:" + fc.b + "\"}");
      return;
    }
  });
}
