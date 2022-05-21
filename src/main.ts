import { Clock } from "./clock"
import { ProgramCounter } from "./programCounter"

const programCounter = new ProgramCounter()

const clock = new Clock(10)
clock.startTicking()