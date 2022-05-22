import { useAlu } from "./alu"
import { useClock } from "./clock"
import { eventBus, IPayload } from "./eventBus"
import { EEvents } from "./events"
import { useInstructionRegister } from "./instructionRegister"
import { useMemoryAddress } from "./memoryAddress"
import { useOutputRegister } from "./outputRegister"
import { useProgramCounter } from "./programCounter"
import { useRAM } from "./ram"
import { useRegisterA } from "./registerA"
import { useRegisterB } from "./registerB"
import { useRegister } from "./useRegister"

const HLT = 0b1000000000000000
const MI = 0b0100000000000000
const RI = 0b0010000000000000
const RO = 0b0001000000000000
const IO = 0b0000100000000000
const II = 0b0000010000000000
const AI = 0b0000001000000000
const AO = 0b0000000100000000

const EO = 0b0000000010000000
const SU = 0b0000000001000000
const BI = 0b0000000000100000
const OI = 0b0000000000010000
const CE = 0b0000000000001000
const CO = 0b0000000000000100
const  J = 0b0000000000000010
const IR = 0b0000000000000001

const instructions: { [key: string]: number; } = {
    '00000000': MI | CO,
    '00000001': RO | II | CE,

    '00010000': MI | CO,
    '00010001': RO | II | CE,
    '00010010': IO | MI,
    '00010011': RO | AI,

    '00100000': MI | CO,
    '00100001': RO | II | CE,
    '00100010': IO | MI,
    '00100011': RO | BI,
    '00100100': EO | AI,

    '11100000': MI | CO,
    '11100001': RO | II | CE,
    '11100010': AO | OI,

    '11110000': MI | CO,
    '11110001': RO | II | CE,
    '11110010': HLT,
    
}

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let instructionRegister = 0

const { setClockHalt } = useClock()
const { setMemoryIn } = useMemoryAddress()
const { setRamOut } = useRAM()
const { setInstructionRegisterOut, setInstructionRegisterIn } = useInstructionRegister()
const { setSumOut } = useAlu()
const { setRegisterAIn, setRegisterAOut } = useRegisterA()
const { setRegisterBIn } = useRegisterB()
const { setProgramCounterEnable, setProgramCounterOut } = useProgramCounter()
const { setOutputRegisterIn } = useOutputRegister()

const onInstructionRegisterChange = (payload?: IPayload) => {
    // TO DO
    if(payload) {
        instructionRegister = payload.value >> 4 || 0
    }
}

const onTickOff = () => {
    
    const microinstruction = `${instructionRegister.toString(2).padStart(4, '0')}${getBinaryValue().toString(2).padStart(4, '0')}`
    
    const instructionSet: number = instructions[microinstruction] || 0

    console.log(microinstruction, ':',  instructionSet.toBinaryFormat(16));
     
    setClockHalt(!!(HLT & instructionSet))
    setMemoryIn(!!(MI & instructionSet))
    setRamOut(!!(RO & instructionSet))
    setInstructionRegisterOut(!!(IO & instructionSet))
    setInstructionRegisterIn(!!(II & instructionSet))
    setRegisterAIn(!!(AI & instructionSet))
    setRegisterAOut(!!(AO & instructionSet))
    setSumOut(!!(EO & instructionSet))
    setRegisterBIn(!!(BI & instructionSet))
    setOutputRegisterIn(!!(OI & instructionSet))
    setProgramCounterEnable(!!(CE & instructionSet))
    setProgramCounterOut(!!(CO & instructionSet))

    setBinaryValue(getBinaryValue() + 1)
    if(getBinaryValue() >= 8) {
        setBinaryValue(0)
    }

}

eventBus.subscribe(EEvents.CLOCK_TICK_OFF, onTickOff)
eventBus.subscribe(EEvents.INSTRUCTION_REGISTER_CHANGE, onInstructionRegisterChange)

export const useInstructionDecoder = () => {
    const setValue = (payload: number) => {
        instructionRegister = payload
    }
    return {
        setValue
    }
}