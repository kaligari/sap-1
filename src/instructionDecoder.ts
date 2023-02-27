import { useAlu } from "./alu"
import { useClock } from "./clock"
import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useInstructionRegister } from "./instructionRegister"
import { instructions, HT, MI, RO, IO, II, AI, AO, EO, BI, OI, CE, CO } from "./instructions"
import { useMemoryAddress } from "./memoryAddress"
import { useOutputRegister } from "./outputRegister"
import { useProgramCounter } from "./programCounter"
import { useRAM } from "./ram"
import { useRegisterA } from "./registerA"
import { useRegisterB } from "./registerB"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()

const { setClockHalt } = useClock()
const { setMemoryIn } = useMemoryAddress()
const { setRamOut } = useRAM()
const { setInstructionRegisterOut, setInstructionRegisterIn, getValue: getInstructionRegisterValue } = useInstructionRegister()
const { setSumOut } = useAlu()
const { setRegisterAIn, setRegisterAOut } = useRegisterA()
const { setRegisterBIn } = useRegisterB()
const { setProgramCounterEnable, setProgramCounterOut } = useProgramCounter()
const { setOutputRegisterIn } = useOutputRegister()

const onTickOff = () => {
    const instructionRegister = getInstructionRegisterValue() >> 4

    const instructionStep = instructionRegister
    const microinstructionStep = getBinaryValue()
    let instructionSet = 0
    switch(microinstructionStep) {
        case 0: instructionSet = MI | CO; break;
        case 1: instructionSet = RO | II | CE; break;
        default:
            instructionSet  = instructions[instructionStep][microinstructionStep - 2]
    }
    
    console.log(instructionStep.toBinaryFormat(4), ':',  microinstructionStep.toBinaryFormat(4));
    console.log('instructionSet', instructionSet?.toBinaryFormat(16) || 'empty');
    
     
    setClockHalt(!!(HT & instructionSet))
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

export const useInstructionDecoder = () => {

}