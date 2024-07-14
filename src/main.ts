import { framesToSeconds } from "./Clock";
import { FrameBuffer } from "./FrameBuffer";

const WIDTH = 2000;
const HEIGHT = 1172;

window.addEventListener("DOMContentLoaded", async () => {
  const processingCanvas = document.getElementById(
    "processing-canvas",
  ) as HTMLCanvasElement;
  processingCanvas.width = WIDTH;
  processingCanvas.height = HEIGHT;
  const processingCtx = processingCanvas.getContext("2d")!;
  await drawImageOnCanvas(processingCtx, "line-source");

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  canvas.style.transform = `scale(${getScaleFactor()})`;
  const animationCtx = canvas.getContext("2d")!;
  await drawImageOnCanvas(animationCtx, "bg-image");

  const frameBuffer = new FrameBuffer();
  frameBuffer.init({
    lineLayerImageData: processingCtx.getImageData(0, 0, WIDTH, HEIGHT),
    animationLayerImageData: animationCtx.getImageData(0, 0, WIDTH, HEIGHT),
    width: WIDTH,
    height: HEIGHT,
  });

  await frameBuffer.fillBuffer();
  while (true) {
    const { frame, frameNumber } = frameBuffer.getFrame() ?? {
      frame: null,
      frameNumber: null,
    };
    if (frame) {
      animationCtx.putImageData(frame, 0, 0);
      document.getElementById("clock")!.innerHTML =
        formatTimestamp(frameNumber);
    }
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }

  // TODO:
  // - Make schedule consider peak times
  // - Make schedule consider split lines
  // - Make animation run faster / adjustable
  // - Add highspeed rail
  // - Add disneyland line
  // - Fix the jagged line edges
  // - Prod build webworker SyntaxError: Unexpected token '<'
  // - Dump tauri...?
  // - Get rid of the extra canvas
});

function getScaleFactor() {
  const xFactor = Math.min(window.innerWidth / WIDTH, 1);
  const yFactor = Math.min(window.innerHeight / HEIGHT, 1);
  return Math.min(xFactor, yFactor);
}

function formatTimestamp(frameNumber: bigint) {
  const seconds = framesToSeconds(frameNumber);
  const minutes = seconds / 60n;
  const hours = minutes / 60n;
  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = (minutes - hours * 60n).toString().padStart(2, "0");
  const secondsStr = (seconds - minutes * 60n).toString().padStart(2, "0");
  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

async function drawImageOnCanvas(
  ctx: CanvasRenderingContext2D,
  imageId: string,
) {
  const img = await getImage(imageId);
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
  img.remove();
}

async function getImage(imageId: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.getElementById(imageId)! as HTMLImageElement;
    if (img.complete) {
      resolve(img);
    } else {
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.error(`Failed to load image with id ${imageId}`);
        reject();
      };
    }
  });
}
