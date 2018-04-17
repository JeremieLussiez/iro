export default class Color {
  static get colors() {
    return {
      red: '#F44336',
      pink: '#E91E63',
      purple: '#9C27B0',
      'deep-purple': '#673AB7',
      indigo: '#3F51B5',
      blue: '#2196F3',
      'light-blue': '#03A9F4',
      cyan: '#00BCD4',
      teal: '#009688',
      green: '#4CAF50',
      'light-green': '#8BC34A',
      yellow: '#FFEB3B',
      amber: '#FFC107',
      orange: '#FF9800',
      'deep-orange': '#FF5722',
      brown: '#795548',
      'blue-grey': '#607D8B',
      grey: '#9E9E9E',
      black: '#000000',
      white: '#ffffff',
    };
  }

  static lerp(source, start, target, end, time) {
    return source + ((target - source) * (time - start) * (1.0 / (end - start)));
  }

  static lerpColor(source, start, target, end, time) {
    return {
      r: Math.round(Color.lerp(source.r, start, target.r, end, time)),
      g: Math.round(Color.lerp(source.g, start, target.g, end, time)),
      b: Math.round(Color.lerp(source.b, start, target.b, end, time)),
    };
  }

  static htmlColorToRGB(htmlColor) {
    const value = parseInt(`0x${htmlColor.substring(1, 7)}`, 16);
    return {
      r: (value >>> 16) & 0x0FF,
      g: (value >>> 8) & 0x0FF,
      b: value & 0x0FF,
    };
  }

  static toHex(value) {
    return Number(value).toString(16).padStart(2, '0');
  }

  static rgbToHTMLColor(rgbColor) {
    const r = Color.toHex(rgbColor.r);
    const g = Color.toHex(rgbColor.g);
    const b = Color.toHex(rgbColor.b);
    return `#${r}${g}${b}`;
  }
}
