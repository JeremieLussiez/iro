#include "./setupIroMode.h"
#include "./iroModesManager.h"

void SetupIroMode::animate(Adafruit_NeoPixel *pixels) {
  for (int i = 0; i < NUMPIXELS; i++) {
    pixels->setPixelColor(i, pixels->Color(10, 10, 10));
  }
  pixels->setPixelColor(this->indicatorPosition, pixels->Color(50, 0, 0));
  pixels->setPixelColor((this->indicatorPosition + 6) % 24, pixels->Color(50, 50, 0));
  pixels->setPixelColor((this->indicatorPosition + 12) % 24, pixels->Color(0, 0, 50));
  pixels->setPixelColor((this->indicatorPosition + 18) % 24, pixels->Color(0, 50, 0));
  pixels->show();
  if (this->loopDelay > 50) {
    this->loopDelay = 0;
    this->indicatorPosition = (this->indicatorPosition + 1) % NUMPIXELS;
  }
  this->loopDelay++;
}

SetupIroMode::SetupIroMode(IroModesManager *manager) {
  this->manager = manager;
  this->server = manager->server;
  this->manager->registerMode(this);
  this->server->on("/setup", [&]() {
    this->manager->switchToMode(this);
    Serial.println("Switched to [SETUP] mode");
    this->server->send(200, "application/json", String("{}"));
  });
}

