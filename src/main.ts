import { ALU } from "./alu"
import { Bus } from "./bus"
import { Clock } from "./clock"
import { RegisterA } from "./registerA"
import { RegisterB } from "./registerB"
// import { ProgramCounter } from "./programCounter"

console.clear()

// const programCounter = new ProgramCounter()
// programCounter.enable = true

const registerA = new RegisterA()
const registerB = new RegisterB()
const alu = new ALU(registerA, registerB)
const bus = new Bus(alu)
const clock = new Clock(1)


registerA.value = 4
registerA.enableIn = true

registerB.value = 1

alu.sumOut = true

clock.startTicking()