import { CanvasImageData } from "./CanvasImageData";
import { Frame } from "./SectionAnimation";
import { isBrighter } from "./colors";
import { withResolvers } from "./withResolvers";

let animationId = 1;
export class BufferEngine {
  animations: [Frame[], bigint, () => void, number][] = [];
  animationLayer: CanvasImageData;

  constructor(animationLayer: CanvasImageData) {
    this.animationLayer = animationLayer;
  }

  addAnimation(animation: Frame[], firstTick: bigint) {
    const { promise, resolve } = withResolvers();
    this.animations.push([animation, firstTick, resolve, animationId++]);
    return promise;
  }

  bufferFrame(tick: bigint, sendToBuffer: (frame: ImageData) => void) {
    const prunedAnimations: [Frame[], bigint, () => void, number][] = [];
    this.animations.forEach(([animation, firstTick, resolve, animationId]) => {
      if (tick >= BigInt(animation.length) + firstTick) {
        resolve();
      } else {
        prunedAnimations.push([animation, firstTick, resolve, animationId]);
        const frame = animation[Number(tick - firstTick)];
        for (const [index, color] of Object.entries(frame)) {
          const pixelIndex = parseInt(index);
          const existingPixelSource =
            this.animationLayer.getPixelSource(pixelIndex);
          if (
            existingPixelSource !== animationId &&
            isBrighter(this.animationLayer.getPixel(pixelIndex), color)
          ) {
            continue;
          }

          this.animationLayer.setPixel(pixelIndex, color, animationId);
        }
      }
    });
    this.animations = prunedAnimations;
    sendToBuffer(this.animationLayer.getImageData());
  }
}
