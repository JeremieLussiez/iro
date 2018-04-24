#include <Arduino.h>
#include "./color.h"

Color lerpColor(Color current, Color target, int lerpSpeed) {
  Color lerped;
  lerped.r = lerp(current.r, target.r, lerpSpeed);
  lerped.g = lerp(current.g, target.g, lerpSpeed);
  lerped.b = lerp(current.b, target.b, lerpSpeed);
  return lerped;
}

bool checkColor(Color color) {
  return color.r >= 0 && color.r < 256 && color.g >= 0 && color.g < 256 && color.b >= 0 && color.b < 256;
}

bool areSameColor(Color current, Color target) {
  return current.r == target.r && current.g == target.g && current.b == target.b;
}

int asciiToInt(char c) {
    return c<'9'?(c-'0'):c<'Z'?(c-'A'+10):c<'z'?(c-'a'+10):0;
}

void hexToInt(String color, int rgb[]) {
    if (color.length()==7) {
      rgb[0]=0;
      rgb[0]=(asciiToInt(color[1])<<4)+asciiToInt(color[2]);
      rgb[1]=0;
      rgb[1]=(asciiToInt(color[3])<<4)+asciiToInt(color[4]);
      rgb[2]=0;
      rgb[2]=(asciiToInt(color[5])<<4)+asciiToInt(color[6]);
    }
}
