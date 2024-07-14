import { RGBA } from "./types";

function colorEquals(a: RGBA, b: RGBA) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

export type Frame = Record<string, RGBA>;

export class SectionAnimation {
  private sectionIndices: number[];
  private targetColor: RGBA;
  private originalColor: RGBA;
  private state: Frame;
  private batchSize: number;
  private rStep: number;
  private gStep: number;
  private bStep: number;
  private aStep: number;
  private resolve!: () => void;
  finished: Promise<void>;
  isFinished = false;

  constructor(
    // Indices of pixels to animate, in the order they
    // should be animated
    sectionIndices: number[],
    // Color to animate to
    targetColor: RGBA,
    // Color to fade back into
    originalColor: RGBA,
    // Duration in frames the animation should take
    duration: number,
  ) {
    this.sectionIndices = [...sectionIndices];
    this.targetColor = targetColor;
    this.originalColor = originalColor;
    this.state = {};
    const colorSteps = 40;
    this.rStep = (targetColor[0] - originalColor[0]) / colorSteps;
    this.gStep = (targetColor[1] - originalColor[1]) / colorSteps;
    this.bStep = (targetColor[2] - originalColor[2]) / colorSteps;
    this.aStep = (targetColor[3] - originalColor[3]) / colorSteps;

    const batchFrames = duration - colorSteps;
    this.batchSize = Math.ceil(sectionIndices.length / batchFrames);
    this.finished = new Promise((resolve) => {
      this.resolve = () => {
        this.isFinished = true;
        resolve();
      };
    });
  }

  interpolateState() {
    // Loop through all the pixels in state, and interpolate them towards
    // their original color.
    Object.entries(this.state).forEach(([index, color]) => {
      if (color === null) throw new Error("Should not happen");
      // Stop condition: If this pixel is already at its original color,
      // there is nothing to do with it. Delete the pixel from state
      // so that it no longer needs to be checked.
      if (colorEquals(color, this.originalColor)) {
        delete this.state[index];
        return;
      }

      // Interpolate
      const newColor: RGBA = [
        color[0] - this.rStep,
        color[1] - this.gStep,
        color[2] - this.bStep,
        color[3] - this.aStep,
      ];

      // Once we are close enough set the color back to its exact
      // original color to avoid overshooting and so that we hit
      // the stop condition
      if (
        Math.abs(newColor[0] - this.originalColor[0]) < Math.abs(2 * this.rStep)
      ) {
        newColor[0] = this.originalColor[0];
      }
      if (
        Math.abs(newColor[1] - this.originalColor[1]) < Math.abs(2 * this.gStep)
      ) {
        newColor[1] = this.originalColor[1];
      }
      if (
        Math.abs(newColor[2] - this.originalColor[2]) < Math.abs(2 * this.bStep)
      ) {
        newColor[2] = this.originalColor[2];
      }
      if (
        Math.abs(newColor[3] - this.originalColor[3]) < Math.abs(2 * this.aStep)
      ) {
        newColor[3] = this.originalColor[3];
      }
      this.state[index] = newColor;
    });
  }

  processBatch() {
    // Get a batch of pixels from the section indices
    // Set their color in this.state to target color advancing
    // the animation
    const batch = this.sectionIndices.splice(0, this.batchSize);
    if (batch.length === 0 && Object.values(this.state).length === 0) {
      return this.resolve();
    }
    for (const pixelIndex of batch) {
      this.state[pixelIndex] = this.targetColor;
    }
  }

  getFrame() {
    this.interpolateState();
    this.processBatch();
    return this.state;
  }

  getPeakColor() {
    return this.targetColor;
  }

  cache() {
    const sectionFrames = [];
    while (this.isFinished === false) {
      sectionFrames.push({ ...this.getFrame() });
    }
    return sectionFrames;
  }
}
