export default class Color {
    static lerp(source, start, target, end, time) {
        return source + (target - source) * (time - start) * (1.0 / (end - start));
    }

    static lerpColor(source, start, target, end, time) {
        return {
            r: Math.round(Color.lerp(source.r, start, target.r, end, time)),
            g: Math.round(Color.lerp(source.g, start, target.g, end, time)),
            b: Math.round(Color.lerp(source.b, start, target.b, end, time))
        }
    }

    static htmlColorToRGB(htmlColor) {
        const value = parseInt("0x" + htmlColor.substring(1, 7));
        return {
            r: (value >> 16) & 0xFF,
            g: (value >> 8) & 0xFF,
            b: value & 0xFF
        }
    }

    static rgbToHTMLColor(rgbColor) {
        return `#${Number(rgbColor.r).toString(16)}${Number(rgbColor.g).toString(16)}${Number(rgbColor.b).toString(16)}`;
    }
}
