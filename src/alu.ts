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
    if(sumOut) {            
        eventBus.publish(EEvents.ALUS_SUM_OUT, { value: getValue() })
    }
}

sumRegisters()
eventBus.subscribe(EEvents.REGISTER_A_CHANGE, sumRegisters)
eventBus.subscribe(EEvents.REGISTER_B_CHANGE, sumRegisters)

export const useAlu = () => {

    const setSumOut = (state: boolean) => {
        sumOut = state
        sumRegisters()
    }

    return {
        setSumOut
    }
}