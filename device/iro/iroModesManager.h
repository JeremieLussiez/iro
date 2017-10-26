#include <Adafruit_NeoPixel.h>
#include <ESP8266WebServer.h>

#ifndef IRO_MODES_MANAGER_H
#define IRO_MODES_MANAGER_H

#define MAX_IRO_MODES 10

class IroMode;
class IroModesManager {
  private:
    IroMode *modes[MAX_IRO_MODES];  
    int lastModeIndex = -1;
    
  public:
    Adafruit_NeoPixel *pixels;
    ESP8266WebServer *server;
    
    IroModesManager(ESP8266WebServer *server, Adafruit_NeoPixel *pixels);
    void animateModes();
    void switchOffAllModes();
    void registerMode(IroMode *iroMode);
    void switchToMode(IroMode *iroMode);
};

#endif

