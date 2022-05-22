import { eventBus } from "./eventBus";
import { EEvents } from "./events";
import { useRegister } from "./useRegister";
import { useRegisterA } from "./registerA";
import { useRegisterB } from "./registerB";

const { getValue, setValue } = useRegister()
const { getValue: getRegisterAValue } = useRegisterA()
const { getValue: getRegisterBValue } = useRegisterB()
let sumOut = false

const sumRegisters = () => {
    setValue(getRegisterAValue() + getRegisterBValue())
}

const onTick = () => {
    if(sumOut) {            
        eventBus.publish(EEvents.ALU_SUM_OUT_TO_BUS, { value: getValue() })
        console.log('EO', getValue().toBinaryFormat(8));
    }
}

sumRegisters()
eventBus.subscribe(EEvents.REGISTER_A_CHANGE, sumRegisters)
eventBus.subscribe(EEvents.REGISTER_B_CHANGE, sumRegisters)
eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)

export const useAlu = () => {

    const setSumOut = (state: boolean) => {
        sumOut = state
        sumRegisters()
    }

    return {
        setSumOut
    }
}