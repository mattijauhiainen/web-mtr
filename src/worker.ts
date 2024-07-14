import { BufferEngine } from "./BufferEngine";
import { CanvasImageData } from "./CanvasImageData";
import { hours, minutes } from "./Clock";
import { Coordinates } from "./Coordinates";
import { LineData } from "./LineData";
import { LineLayer } from "./LineLayer";
import { LineSchedule } from "./LineSchedule";
import {
  createAddToBufferCommand,
  isBufferFullCommand,
  isBufferLowCommand,
  isInitCommand,
} from "./commands";
import {
  airportExpressData,
  blueLineData,
  greenLineData,
  lightBlueLineData,
  purpleLineData,
  redLineData,
  southIslandLineData,
  tuenMaLineData,
  tungChungLineData,
} from "./lineConstants";
import { lineSchedules, startOffset } from "./schedules";

let pauseBuffering = false;

addEventListener("message", async (event) => {
  const command = event?.data;
  if (isBufferFullCommand(command)) {
    pauseBuffering = true;
  }
  if (isBufferLowCommand(command)) {
    pauseBuffering = false;
  }
  if (!isInitCommand(command)) return;

  const { lineLayerImageData, animationLayerImageData, width, height } =
    command;
  const coordinates = new Coordinates(width, height);

  const lineLayer = new LineLayer(
    coordinates,
    new CanvasImageData(lineLayerImageData, coordinates),
  )
    .reduceColors()
    .reduceNoise();
  const lineData = new LineData(lineLayer, coordinates);

  const animationLayer = new CanvasImageData(
    animationLayerImageData,
    coordinates,
  );
  const engine = new BufferEngine(animationLayer);
  const lines = getLines(lineData, engine);

  for (
    let frameNumber = startOffset;
    frameNumber < hours(25) + minutes(20);
    frameNumber++
  ) {
    lines.forEach((line) => line.onTick(frameNumber));
    engine.bufferFrame(frameNumber, (frame) => {
      self.postMessage(createAddToBufferCommand({ frame, frameNumber }));
    });
    while (pauseBuffering) await wait(50);
    // TODO: Why did I need this?
    await wait(0);
  }
});

async function wait(msToWait: number) {
  return new Promise((resolve) => setTimeout(resolve, msToWait));
}

function getLines(lineData: LineData, engine: BufferEngine) {
  return [
    new LineSchedule(
      lineSchedules.blueLine[0],
      lineSchedules.blueLine[1],
      Math.round(minutes(1.9)),
      lineData.getLineData(blueLineData, engine),
    ),
    new LineSchedule(
      lineSchedules.blueLineReverse[0],
      lineSchedules.blueLineReverse[1],
      Math.round(minutes(1.9)),
      lineData.getLineData(blueLineData, engine, true),
    ),
    new LineSchedule(
      lineSchedules.redLine[0],
      lineSchedules.redLine[1],
      Math.round(minutes(2)),
      lineData.getLineData(redLineData, engine),
    ),
    new LineSchedule(
      lineSchedules.redLineReverse[0],
      lineSchedules.redLineReverse[1],
      Math.round(minutes(2)),
      lineData.getLineData(redLineData, engine, true),
    ),
    new LineSchedule(
      lineSchedules.airportExpress[0],
      lineSchedules.airportExpress[1],
      minutes(10),
      lineData.getLineData(airportExpressData, engine),
    ),
    new LineSchedule(
      lineSchedules.airportExpressReverse[0],
      lineSchedules.airportExpressReverse[1],
      minutes(10),
      lineData.getLineData(airportExpressData, engine, true),
    ),
    new LineSchedule(
      lineSchedules.southIslandLine[0],
      lineSchedules.southIslandLine[1],
      Math.round(minutes(3.3)),
      lineData.getLineData(southIslandLineData, engine),
    ),
    new LineSchedule(
      lineSchedules.southIslandLineReverse[0],
      lineSchedules.southIslandLineReverse[1],
      Math.round(minutes(3.3)),
      lineData.getLineData(southIslandLineData, engine, true),
    ),
    new LineSchedule(
      lineSchedules.tuenMaLine[0],
      lineSchedules.tuenMaLine[1],
      Math.round(minutes(2.7)),
      lineData.getLineData(tuenMaLineData, engine),
    ),
    new LineSchedule(
      lineSchedules.tuenMaLineReverse[0],
      lineSchedules.tuenMaLineReverse[1],
      Math.round(minutes(2.7)),
      lineData.getLineData(tuenMaLineData, engine, true),
    ),
    new LineSchedule(
      lineSchedules.lightBlueLine[0],
      lineSchedules.lightBlueLine[1],
      Math.round(minutes(2.7)),
      lineData.getLineData(lightBlueLineData, engine),
    ),
    new LineSchedule(
      lineSchedules.lightBlueLineReverse[0],
      lineSchedules.lightBlueLineReverse[1],
      Math.round(minutes(2.7)),
      lineData.getLineData(lightBlueLineData, engine, true),
    ),
    new LineSchedule(
      lineSchedules.greenLine[0],
      lineSchedules.greenLine[1],
      Math.round(minutes(2.1)),
      lineData.getLineData(greenLineData, engine),
    ),
    new LineSchedule(
      lineSchedules.greenLineReverse[0],
      lineSchedules.greenLineReverse[1],
      Math.round(minutes(2.1)),
      lineData.getLineData(greenLineData, engine, true),
    ),
    new LineSchedule(
      lineSchedules.tungChungLine[0],
      lineSchedules.tungChungLine[1],
      minutes(6),
      lineData.getLineData(tungChungLineData, engine),
    ),
    new LineSchedule(
      lineSchedules.tungChungLineReverse[0],
      lineSchedules.tungChungLineReverse[1],
      minutes(6),
      lineData.getLineData(tungChungLineData, engine, true),
    ),
    new LineSchedule(
      lineSchedules.purpleLine[0],
      lineSchedules.purpleLine[1],
      Math.round(minutes(2.2)),
      lineData.getLineData(purpleLineData, engine),
    ),
    new LineSchedule(
      lineSchedules.purpleLineReverse[0],
      lineSchedules.purpleLineReverse[1],
      Math.round(minutes(2.2)),
      lineData.getLineData(purpleLineData, engine, true),
    ),
  ];
}
