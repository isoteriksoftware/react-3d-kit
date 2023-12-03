import { ColorClass } from "../core";
import { Color } from "three";

export const getContrastTextColor = (hexColor: string): string => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return "#000";

  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);
  return luminance > 0.4 ? "#000000" : "#FFFFFF";
};

export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const calculateLuminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

export const isColorClass = (value: any): value is ColorClass => {
  const validColorClasses = [
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
  ];
  return validColorClasses.includes(value);
};

export const createColorDarkener = () => {
  const color = new Color();

  return (
    colorInput: Color | string | number,
    factor: number = 0.5,
  ): string => {
    color.set(colorInput);
    factor = Math.max(0, Math.min(1, factor));

    color.r *= factor;
    color.g *= factor;
    color.b *= factor;

    return "#" + color.getHexString();
  };
};
