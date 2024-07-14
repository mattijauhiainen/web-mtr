import { BufferEngine } from "./BufferEngine";
import { Coordinates } from "./Coordinates";
import { Line } from "./Line";
import { LineLayer } from "./LineLayer";
import { LineConstants } from "./lineConstants";

export class LineData {
  lineLayer: LineLayer;
  coordinates: Coordinates;
  constructor(lineLayer: LineLayer, coordinates: Coordinates) {
    this.lineLayer = lineLayer;
    this.coordinates = coordinates;
  }

  getLineData(data: LineConstants, engine: BufferEngine, reversed = false) {
    const lineData: { pixels: number[]; duration: number }[] = [];
    data.sectionData.forEach((section) => {
      const pixels = section.coordinates
        .map((subSection) =>
          this.lineLayer.getSection(this.coordinates.fromXy(subSection))
        )
        .flat();
      if (reversed) {
        lineData.unshift({
          pixels: pixels.reverse(),
          duration: section.duration,
        });
      } else {
        lineData.push({ pixels, duration: section.duration });
      }
    });
    return new Line(lineData, data.color, data.bgColor, engine);
  }
}
