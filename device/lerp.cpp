int lerp(int current, int target) {
  int lerped = current;
  if (current > target) {
    lerped = current - 1;
  } else if (current < target) {
    lerped = current + 1;
  }
  return lerped;
}
