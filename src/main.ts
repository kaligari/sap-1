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

// console.clear()

const { startTicking } = useClock()

useInstructionDecoder()
useBus()
useAlu()
useRAM()
useInstructionRegister()
useMemoryAddress()
useProgramCounter()
useRegisterA()
useRegisterB()

startTicking(100)