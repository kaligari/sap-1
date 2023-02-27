import { eventBus } from "./eventBus";
import { EEvents } from "./events";
import { useRegister } from "./useRegister";
import { useRegisterA } from "./registerA";
import { useRegisterB } from "./registerB";
import { useBus } from "./bus";

const { getValue, setValue } = useRegister()
const { getValue: getRegisterAValue } = useRegisterA()
const { getValue: getRegisterBValue } = useRegisterB()
const { setValue: setValueToBus } = useBus()
let sumOut = false

const onTick = () => {
    if(sumOut) {            
        setValue(getRegisterAValue() + getRegisterBValue())
        setValueToBus(getValue())
        console.log('EO', getValue().toBinaryFormat(8));
    }
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)

export const useAlu = () => {

    const setSumOut = (state: boolean) => {
        sumOut = state
    }

    return {
        setSumOut
    }
}