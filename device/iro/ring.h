#include "./configuration.h"

class Ring {
  private:
    void int led[NUMPIXELS];
  public:
    void rotate(int steps);
    void drawArc(float startPosition, float endPosition, int startColor, int endColor);
    void drawRing(int color);
};

