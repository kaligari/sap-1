import { useBus } from "./bus"
import { useAlu } from "./alu"
import { useClock } from "./clock"
// import { useProgramCounter } from "./programCounter"
import { useRegisterA } from "./registerA"
import { useRegisterB } from "./registerB"

console.clear()
const { startTicking } = useClock()
// const { setEnable: setProgramCounterEnable } = useProgramCounter(16)
const { setValue: setRegisterAValue, setEnableIn: setRegisterAEnableIn } = useRegisterA()
const { setValue: setRegisterBValue } = useRegisterB()
const { setSumOut } = useAlu()

useBus()
setRegisterBValue(1)
setRegisterAValue(4)
setRegisterAEnableIn(true)
setSumOut(true)
// setProgramCounterEnable(true)
// bus
// programCounter.enable = true

// registerA.enableIn = true

// registerB.value = 1

// alu.sumOut = true

startTicking(1)