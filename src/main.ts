import { bus } from "./bus"
import { alu } from "./alu"
import { clock } from "./clock"
import { registerA } from "./registerA"
import { registerB } from "./registerB"
// import { programCounter } from "./programCounter"

console.clear()

bus
// programCounter.enable = true

registerA.value = 4
registerA.enableIn = true

registerB.value = 1

alu.sumOut = true

clock.startTicking(1)