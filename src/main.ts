import { useBus } from "./bus"
// import { useAlu } from "./alu"
import { useClock } from "./clock"
import { useMemoryAddress } from "./memoryAddress"
import { useProgramCounter } from "./programCounter"
import { useRAM } from "./ram"
// import { useRegisterA } from "./registerA"
// import { useRegisterB } from "./registerB"

console.clear()
const { startTicking } = useClock()
const { setEnable: setProgramCounterEnable } = useProgramCounter()
const{ setEnableIn: setMemoryAddressEnableIn } = useMemoryAddress()
// const { setValue: setRegisterAValue, setEnableIn: setRegisterAEnableIn } = useRegisterA()
// const { setValue: setRegisterBValue } = useRegisterB()
// const { setSumOut } = useAlu()

useBus()
useRAM()
setMemoryAddressEnableIn(true)
// setRegisterBValue(1)
// setRegisterAValue(4)
// setRegisterAEnableIn(true)
// setSumOut(true)
setProgramCounterEnable(true)
// bus
// programCounter.enable = true

// registerA.enableIn = true

// registerB.value = 1

// alu.sumOut = true

startTicking(1)