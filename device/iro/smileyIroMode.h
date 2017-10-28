#include "./lerp.h"
#include "./iroMode.h"
#include "./color.h"

class SmileyIroMode: public IroMode {
  private:
    IroModesManager *manager;
    ESP8266WebServer *server;
    Color currentForegroundColor = {.r = 0, .g = 0, .b = 0};
    Color currentBackgroundColor = {.r = 0, .g = 0, .b = 0};
    Color targetForegroundColor = {.r = 0, .g = 0, .b = 0};
    Color targetBackgroundColor = {.r = 0, .g = 0, .b = 0};
    int loopDelay = 0;
  public:
    SmileyIroMode(IroModesManager *manager);
    void animate(Adafruit_NeoPixel *pixels);
    void handleRoute();
};

