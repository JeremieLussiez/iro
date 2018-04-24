float lerp(float source, float target, float start, float end, float time) {
    return source + ((target - source) * (time - start) * (1.0 / (end - start)));
}
