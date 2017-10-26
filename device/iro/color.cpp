#include "./color.h"

Color lerpColor(Color current, Color target) {
  Color lerped;
  lerped.r = lerp(current.r, target.r);
  lerped.g = lerp(current.g, target.g);
  lerped.b = lerp(current.b, target.b);
  return lerped;
}

bool checkColor(Color color) {
  return color.r >= 0 && color.r < 256 && color.g >= 0 && color.g < 256 && color.b >= 0 && color.b < 256;
}

bool areSameColor(Color current, Color target) {
  return current.r == target.r && current.g == target.g && current.b == target.b;
}

