import "./number.extensions"
import { useBus } from "./bus"
import { useAlu } from "./alu"
import { useClock } from "./clock"
import { useInstructionDecoder } from "./instructionDecoder"
import { useInstructionRegister } from "./instructionRegister"
import { useMemoryAddress } from "./memoryAddress"
import { useProgramCounter } from "./programCounter"
import { useRAM } from "./ram"
import { useRegisterA } from "./registerA"
import { useRegisterB } from "./registerB"

console.clear()

const { startTicking } = useClock()
// const { setProgramCounterEnable } = useProgramCounter()

// const { setEnableIn: setMemoryAddressEnableIn } = useMemoryAddress()
// const { setEnableIn: setInstructionRegisterIn } = useInstructionRegister()
// const { setValue: setRegisterAValue, setEnableIn: setRegisterAEnableIn } = useRegisterA()
// const { setValue: setRegisterBValue } = useRegisterB()
// const { setSumOut } = useAlu()

useBus()
useAlu()
useRAM()
useInstructionDecoder()
useInstructionRegister()
useMemoryAddress()
useProgramCounter()
useRegisterA()
useRegisterB()
// setMemoryAddressEnableIn(true)

// setRegisterBValue(1)
// setRegisterAValue(4)
// setRegisterAEnableIn(true)
// setSumOut(true)
// setProgramCounterEnable(true)
// setInstructionRegisterIn(true)
// bus
// programCounter.enable = true

// registerA.enableIn = true

// registerB.value = 1

// alu.sumOut = true

startTicking(1)