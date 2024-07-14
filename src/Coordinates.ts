export class Coordinates {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  fromXy({ x, y }: { x: number; y: number }) {
    return y * this.width * 4 + x * 4;
  }

  toXy(index: number) {
    return {
      x: index % (this.width * 4),
      y: Math.floor(index / (this.width * 4)),
    };
  }

  distance(pixelIndex1: number, pixelIndex2: number) {
    const p1xy = this.toXy(pixelIndex1);
    const p2xy = this.toXy(pixelIndex2);
    const xDiff = p1xy.x - p2xy.x;
    const yDiff = p1xy.y - p2xy.y;
    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  }

  getNeighbors(index: number): number[] {
    return [
      index - this.width * 4 - 4,
      index - this.width * 4,
      index - this.width * 4 + 4,
      index - 4,
      index + 4,
      index + this.width * 4 - 4,
      index + this.width * 4,
      index + this.width * 4 + 4,
    ];
  }
}
