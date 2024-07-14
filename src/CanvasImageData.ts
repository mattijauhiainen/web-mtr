import { Coordinates } from "./Coordinates";
import { RGBA } from "./types";

export class CanvasImageData {
  private imageData: ImageData;
  private coordinates: Coordinates;
  private pixelSource: Map<number, number> = new Map();

  constructor(imageData: ImageData, coordinates: Coordinates) {
    this.imageData = imageData;
    this.coordinates = coordinates;
  }

  getPixel(index: number): RGBA {
    return Array.from(this.imageData.data.slice(index, index + 4)) as [
      number,
      number,
      number,
      number
    ];
  }

  getPixelSource(index: number): number | undefined {
    return this.pixelSource.get(index);
  }

  setPixel(index: number, pixel: RGBA, source: number) {
    this.imageData.data[index] = pixel[0];
    this.imageData.data[index + 1] = pixel[1];
    this.imageData.data[index + 2] = pixel[2];
    this.imageData.data[index + 3] = pixel[3];
    this.pixelSource.set(index, source);
  }

  getMatchingNeighbors(index: number) {
    const pixel = this.getPixel(index);
    return this.coordinates.getNeighbors(index).filter((neighborIndex) => {
      const neighborPixel = this.getPixel(neighborIndex);
      return (
        Math.abs(neighborPixel[0] - pixel[0]) < 1 &&
        Math.abs(neighborPixel[1] - pixel[1]) < 1 &&
        Math.abs(neighborPixel[2] - pixel[2]) < 1
      );
    });
  }

  getImageData() {
    return this.imageData;
  }

  getData() {
    return this.imageData.data;
  }
}
