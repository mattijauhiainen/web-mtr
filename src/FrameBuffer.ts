import {
  createBufferFullCommand,
  createBufferLowCommand,
  createInitCommand,
  isAddToBufferCommand,
} from "./commands";

const LOW_BUFFER = 100;
const HIGH_BUFFER = 200;

// Frame buffer for buffering the animation frames with web worker.
// Buffering will start once `init` has been called. When buffer size
// reaches HIGH_BUFFER, buffering is paused. When buffering is paused
// and the buffer size goes below LOW_BUFFER, it is started again.
export class FrameBuffer {
  buffering = true;
  buffer: { frame: ImageData; frameNumber: bigint }[] = [];
  worker: Worker;

  constructor() {
    this.worker = new Worker(new URL("./worker", import.meta.url), {
      type: "module",
    });
  }

  init({
    lineLayerImageData,
    animationLayerImageData,
    width,
    height,
  }: {
    lineLayerImageData: ImageData;
    animationLayerImageData: ImageData;
    width: number;
    height: number;
  }) {
    this.worker.postMessage(
      createInitCommand({
        lineLayerImageData,
        animationLayerImageData,
        width,
        height,
      }),
    );

    this.worker.addEventListener("message", (event) => {
      const command = event?.data;
      if (isAddToBufferCommand(command)) {
        this.buffer.push({
          frame: command.frame,
          frameNumber: command.frameNumber,
        });
        if (this.buffer.length > HIGH_BUFFER && this.buffering) {
          this.worker.postMessage(createBufferFullCommand());
          this.buffering = false;
        }
      }
    });
  }

  // Returns a promise, which will resolve once the buffer is filled
  // up to the HIGH_BUFFER threshold.
  async fillBuffer() {
    if (this.buffer.length >= HIGH_BUFFER) return;
    if (!this.buffering) throw new Error("Buffer not full but not buffering");

    return new Promise<void>(async (resolve) => {
      while (this.buffer.length < HIGH_BUFFER) {
        await new Promise((resolveTimeout) => setTimeout(resolveTimeout, 100));
      }
      resolve();
    });
  }

  // Return a frame from the buffer. Returns null when buffer is empty
  getFrame() {
    if (this.buffer.length === 0) return null;
    const { frame, frameNumber } = this.buffer.shift()!;
    if (this.buffer.length < LOW_BUFFER && !this.buffering) {
      this.worker.postMessage(createBufferLowCommand());
      this.buffering = true;
    }
    return { frame, frameNumber };
  }
}
