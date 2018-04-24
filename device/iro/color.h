#include "./lerp.h"

#ifndef COLOR_H
#define COLOR_H

typedef struct Color {
  int r;
  int g;
  int b;
} Color;

Color lerpColor(Color current, Color target, int lerpSpeed);

bool checkColor(Color);
bool areSameColor(Color current, Color target);
int asciiToInt(char c);
void hexToInt(String color, int rgb[]);

#endif

