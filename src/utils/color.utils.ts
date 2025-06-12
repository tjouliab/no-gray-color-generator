import seedColor from 'seed-color';

export abstract class ColorUtils {
  /**
   * A color generator that decides what is the proportion of gray inside the colors
   *
   * @param id - Id to pass to the seed color generator
   * @param grayScale - Decide what is the "proportion" of gray to generate. Set between 0 and 100.
   * @returns The Hex code of the color
   */
  public static noGrayColorGenerator(
    id: number,
    grayScale: number
  ): string {
    // Use seedColor to get a deterministic color
    const base = seedColor(id.toString());

    // Fallback grayScale is out of bound
    if (grayScale < 0 || 100 < grayScale) {
      return rgbToHex(base.r, base.g, base.b)
    }

    // base is likely { r, g, b }
    const { r, g, b } = base;
    let { h, s, v } = rgbToHsv(r, g, b);
    // Ensure saturation is not gray (S > 0.5)
    s = ((s - 1) * grayScale) / 100 + 1;
    const rgb = hsvToRgb(h, s, v);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }
}

// Helper: Convert RGB to HSV
function rgbToHsv(
  r: number,
  g: number,
  b: number
): { h: number; s: number; v: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, v };
}

// Helper: Convert HSV to RGB
function hsvToRgb(
  h: number,
  s: number,
  v: number
): { r: number; g: number; b: number } {
  let r = 0,
    g = 0,
    b = 0;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// Helper: Convert RGB to HEX
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}
