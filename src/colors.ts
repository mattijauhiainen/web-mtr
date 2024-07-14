import { RGBA } from "./types";

export const lineColors: Record<string, RGBA> = {
  red: [242, 6, 18, 255],
  blue: [10, 116, 287, 255],
  turquoise: [60, 134, 134, 255],
  yellow: [209, 196, 65, 255],
  brown: [134, 52, 26, 255],
  lightBlue: [120, 183, 239, 255],
  green: [69, 153, 68, 255],
  orange: [244, 140, 75, 255],
  purple: [108, 99, 137, 255],
} as const;

export const lineBgColors: Record<string, RGBA> = {
  red: [117, 117, 117, 255],
  blue: [141, 141, 141, 255],
  turquoise: [188, 188, 188, 255],
  yellow: [104, 104, 104, 255],
  brown: [199, 199, 199, 255],
  lightBlue: [87, 87, 87, 255],
  green: [166, 166, 166, 255],
  orange: [176, 176, 176, 255],
  purple: [203, 203, 203, 255],
} as const;

export function colorEquals(a: RGBA, b: RGBA) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

export function isBgColor(color: RGBA) {
  return !!Object.values(lineBgColors).find((bgColor) =>
    colorEquals(bgColor, color)
  );
}

function avg(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function isGreyer(a: RGBA, b: RGBA) {
  const aAvg = avg(a.slice(0, 2));
  const bAvg = avg(b.slice(0, 2));
  const aDiff =
    Math.abs(aAvg - a[0]) + Math.abs(aAvg - a[1]) + Math.abs(aAvg - a[2]);
  const bDiff =
    Math.abs(bAvg - b[0]) + Math.abs(bAvg - b[1]) + Math.abs(bAvg - b[2]);
  return aDiff < bDiff;
}

export function isBrighter(a: RGBA, b: RGBA) {
  return !isGreyer(a, b);
}
