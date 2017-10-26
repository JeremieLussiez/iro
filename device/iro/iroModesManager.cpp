#include "./iroModesManager.h"
#include "./iroMode.h"

IroModesManager::IroModesManager(ESP8266WebServer *server, Adafruit_NeoPixel *pixels) {
  this->server = server;
  this->pixels = pixels;
}

void IroModesManager::registerMode(IroMode *iroMode) {
  if (this->lastModeIndex < MAX_IRO_MODES) {
    this->lastModeIndex++;
    this->modes[this->lastModeIndex] = iroMode;
  }
}

void IroModesManager::switchOffAllModes() {
  for (int i = 0; i <= this->lastModeIndex; i++) {
    Serial.print("Stopping mode ");
    Serial.println(i);
    this->modes[i]->isRunning = false;
  }
}

void IroModesManager::switchToMode(IroMode *iroMode) {
  Serial.println("Switching mode...");
  this->switchOffAllModes();
  iroMode->isRunning = true;
  Serial.println("Run new mode");
}

void IroModesManager::animateModes() {
  for (int i = 0; i <= this->lastModeIndex; i++) {
    if (this->modes[i]->isRunning == true) {
      this->modes[i]->animate(this->pixels);
    }
  }
}

