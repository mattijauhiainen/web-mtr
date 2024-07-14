export class Clock {
  currentFrame = 0n;

  constructor(startOffsetInSeconds: bigint) {
    this.currentFrame = startOffsetInSeconds * framesPerSecond;
  }

  callbacks: ((currentFrame: bigint) => void)[] = [];
  addCallback(callback: (currentFrame: bigint) => void) {
    this.callbacks.push(callback);
  }

  tick() {
    for (const callback of this.callbacks) {
      callback(framesToSeconds(this.currentFrame));
    }
    this.currentFrame++;
  }
}

export const framesPerSecond = 1n;

export function framesToSeconds(frameNumber: bigint) {
  return frameNumber / framesPerSecond;
}

export function framesToMinutes(frameNumber: bigint) {
  return framesToSeconds(frameNumber) / 60n;
}

export function framesToHours(frameNumber: bigint) {
  return framesToMinutes(frameNumber) / 60n;
}

export function minutes(minutes: number) {
  return minutes * 60;
}

export function hours(hours: number) {
  return 3600 * hours;
}
