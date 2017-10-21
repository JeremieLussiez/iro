#include "./lerp.h"
#include "./iroMode.h"

class SetupIroMode: public IroMode {
  private:
    IroModesManager *manager;
    ESP8266WebServer *server;
    int indicatorPosition = 0;
    int loopDelay = 0;
  public:
    SetupIroMode(IroModesManager *manager);
    void animate(Adafruit_NeoPixel *pixels);
};

