# MTR System map animation

Animation of the Hong Kong MTRs subway network.

Animation is hosted [here](https://mattijauhiainen.github.io/web-mtr/)


## Is it realtime?

Nope.

## Is it accurate?

No, not at all. As far as I know HK MTR does not publish a timetable or real time information about their train locations. MTRs website does have first and last train schedules for stations, and average frequencies for lines, the durations between stations is taken from MTRs journey planner app. The train frequencies I've used are the peak hour frequencies.

## How is it built?

The line coordinates are scraped off reduced color version of the system map at the beginning of the animation which causes the initial few second delay before the clock starts to run. The animation itself works by drawing the line locations onto a HTML Canvas element on every frame. Frames with line locations are calculated ahead of time in a worker thread to prevent jank.

## Why did I build this?

Just for fun.

