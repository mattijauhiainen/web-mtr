import { hours, minutes } from "./Clock";

export const startOffset = BigInt(hours(5) + minutes(36));

export const lineSchedules: Record<
  string,
  [firstTrain: number, lastTrain: number]
> = {
  blueLine: [hours(6), hours(24) + minutes(50)],
  blueLineReverse: [hours(5) + minutes(55), hours(24) + minutes(35)],
  redLine: [hours(6), hours(24) + minutes(30)],
  redLineReverse: [hours(6) + minutes(6), hours(24) + minutes(54)],
  airportExpress: [hours(6), hours(24) + minutes(45)],
  airportExpressReverse: [hours(5) + minutes(50), hours(24) + minutes(48)],
  southIslandLine: [hours(6), hours(24) + minutes(42)],
  southIslandLineReverse: [hours(6) + minutes(11), hours(25) + minutes(5)],
  tuenMaLine: [hours(5) + minutes(45), hours(24) + minutes(9)],
  tuenMaLineReverse: [hours(5) + minutes(38), hours(23) + minutes(54)],
  lightBlueLine: [hours(5) + minutes(55), hours(17) + minutes(55)],
  lightBlueLineReverse: [hours(6) + minutes(4), hours(17) + minutes(1)],
  greenLine: [hours(6) + minutes(10), hours(24) + minutes(40)],
  greenLineReverse: [hours(6) + minutes(7), hours(24) + minutes(22)],
  tungChungLine: [hours(6) + minutes(2), hours(24) + minutes(43)],
  tungChungLineReverse: [hours(6) + minutes(1), hours(24) + minutes(50)],
  purpleLine: [hours(6) + minutes(13), hours(25) + minutes(12)],
  purpleLineReverse: [hours(6), hours(24) + minutes(50)],
} as const;
