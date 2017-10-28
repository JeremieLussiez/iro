int lerp(int current, int target, int lerpSpeed) {
  lerpSpeed = lerpSpeed > 0 ? lerpSpeed : 1;
  int lerped = current;
  if (current > target + lerpSpeed) {
    lerped = current - lerpSpeed;
  } else if (current < target - lerpSpeed) {
    lerped = current + lerpSpeed;
  } else {
    lerped = target;
  }
  return lerped;
}
