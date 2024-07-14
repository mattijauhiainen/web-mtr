import { BufferEngine } from "./BufferEngine";
import { Frame, SectionAnimation } from "./SectionAnimation";
import { RGBA } from "./types";

type SectionData = {
  duration: number;
  pixels: number[];
};

export class Line {
  sections: SectionData[];
  color: RGBA;
  originalPixel: RGBA;
  engine: BufferEngine;
  sectionFrames: Frame[][] = [];

  constructor(
    sections: SectionData[],
    color: RGBA,
    originalPixel: RGBA,
    engine: BufferEngine,
  ) {
    this.sections = sections;
    this.color = color;
    this.engine = engine;
    this.originalPixel = originalPixel;
    this.cache();
  }

  async run(firstTick: bigint) {
    let offset = firstTick;
    for (const sectionFrames of this.sectionFrames) {
      await this.engine.addAnimation(sectionFrames, offset);
      offset += BigInt(sectionFrames.length);
    }
  }

  cache() {
    const sectionFrames = [];
    for (const section of this.sections) {
      const animation = new SectionAnimation(
        section.pixels,
        this.color,
        this.originalPixel,
        section.duration,
      );
      sectionFrames.push(animation.cache());
    }
    this.sectionFrames = sectionFrames;
  }
}
