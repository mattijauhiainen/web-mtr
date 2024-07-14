import { CanvasImageData } from "./CanvasImageData";
import { Coordinates } from "./Coordinates";
import { RGB, RGBA } from "./types";

export class LineLayer {
  coordinates: Coordinates;
  canvasImageData: CanvasImageData;

  constructor(coordinates: Coordinates, canvasImageData: CanvasImageData) {
    this.coordinates = coordinates;
    this.canvasImageData = canvasImageData;
  }

  // Reduce colors to only colors matching MTR lines
  reduceColors() {
    for (let i = 0; i < this.canvasImageData.getData().length; i += 4) {
      const pixel = this.canvasImageData.getPixel(i);
      const newColor = getLineColor(pixel);
      if (newColor) {
        this.canvasImageData.setPixel(i, [...newColor, 255], -1);
      } else {
        this.canvasImageData.setPixel(i, [255, 255, 255, 255], -1);
      }
    }
    return this;
  }

  // Reduce noise by blanking all pixels that do not have enough
  // neighbors with same color
  reduceNoise() {
    let pixelsToBlank: number[] = [];
    for (let i = 0; i < this.canvasImageData.getData().length; i += 4) {
      const pixel = this.canvasImageData.getPixel(i);
      if (pixel.join(",") === "255,255,255,255") continue;

      const neighborColorCounts = this.coordinates
        .getNeighbors(i)
        .map((neighborIndex: number) =>
          this.canvasImageData.getPixel(neighborIndex)
        )
        .reduce<Record<string, number>>(
          (acc: Record<string, number>, neighborPixel: RGBA) => {
            const key = neighborPixel?.join(",") ?? "NULL";
            acc[key] = (acc[key] ?? 0) + 1;
            return acc;
          },
          {}
        );
      if (neighborColorCounts["255,255,255,255"] > 5) {
        pixelsToBlank.push(i);
      }
    }
    for (const i of pixelsToBlank) {
      this.canvasImageData.setPixel(i, [255, 255, 255, 255], -1);
    }
    return this;
  }

  getSection(startIndex: number) {
    const visited: number[] = [];
    const toProcess = [startIndex];
    while (toProcess.length > 0) {
      const index = toProcess.shift()!;
      if (visited.includes(index)) continue;

      visited.push(index);
      for (const neighbor of this.canvasImageData.getMatchingNeighbors(index)) {
        toProcess.push(neighbor);
      }
    }
    return visited;
  }
}

const lineColors: Record<string, RGB> = {
  turquoise: [4, 136, 135],
  purple: [110, 99, 140],
  darkBlue: [10, 116, 187],
  green: [4, 155, 55],
  brown: [145, 44, 13],
  lightBlue: [98, 185, 244],
  red: [242, 6, 18],
  olive: [212, 195, 10],
  orange: [243, 135, 55],
};

function getLineColor(pixel: RGBA): RGB | null {
  for (const targetColor of Object.values(lineColors)) {
    if (
      Math.abs(targetColor[0] - pixel[0]) < 20 &&
      Math.abs(targetColor[1] - pixel[1]) < 20 &&
      Math.abs(targetColor[2] - pixel[2]) < 20
    ) {
      return targetColor;
    }
  }
  return null;
}
