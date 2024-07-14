type AddToBufferCommand = {
  command: "ADD_TO_BUFFER";
  frame: ImageData;
  frameNumber: bigint;
};

export function isAddToBufferCommand(op: any): op is AddToBufferCommand {
  return op?.command === "ADD_TO_BUFFER";
}

export function createAddToBufferCommand({
  frame,
  frameNumber,
}: {
  frame: ImageData;
  frameNumber: bigint;
}): AddToBufferCommand {
  return {
    command: "ADD_TO_BUFFER",
    frame,
    frameNumber,
  };
}

type BufferFullCommand = {
  command: "BUFFER_FULL";
};

export function isBufferFullCommand(op: any): op is BufferFullCommand {
  return op?.command === "BUFFER_FULL";
}

export function createBufferFullCommand(): BufferFullCommand {
  return { command: "BUFFER_FULL" };
}

type BufferLowCommand = {
  command: "BUFFER_LOW";
};

export function isBufferLowCommand(op: any): op is BufferLowCommand {
  return op?.command === "BUFFER_LOW";
}

export function createBufferLowCommand(): BufferLowCommand {
  return { command: "BUFFER_LOW" };
}

type InitCommand = {
  command: "INITIALIZE";
  lineLayerImageData: ImageData;
  animationLayerImageData: ImageData;
  width: number;
  height: number;
};

export function isInitCommand(op: any): op is InitCommand {
  return op?.command === "INITIALIZE";
}

export function createInitCommand({
  lineLayerImageData,
  animationLayerImageData,
  width,
  height,
}: {
  lineLayerImageData: ImageData;
  animationLayerImageData: ImageData;
  width: number;
  height: number;
}): InitCommand {
  return {
    command: "INITIALIZE",
    lineLayerImageData,
    animationLayerImageData,
    width,
    height,
  };
}
