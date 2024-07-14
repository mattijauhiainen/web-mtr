import { Line } from "./Line";

export class LineSchedule {
  schedule: number[] = [];
  line: Line;

  constructor(
    firstTrain: number,
    lastTrain: number,
    frequency: number,
    line: Line
  ) {
    // Given a first train, last train and frequency, construct an
    // array with departure time for each train
    let departureTime = firstTrain;
    while (departureTime < lastTrain) {
      this.schedule.push(departureTime);
      departureTime += frequency;
    }
    this.line = line;
  }

  onTick(seconds: bigint) {
    if (this.schedule[0] <= seconds) {
      this.schedule = this.schedule.slice(1);
      this.line.run(seconds);
    }
  }
}
