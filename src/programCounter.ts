import { useBus } from "./bus"
import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue, setValue } = useRegister()
const { setValue: setValueToBus } = useBus()
let enableOut = false
let enable = false
let maxValue = 16

const onTick = () => {
    if(enable) {
        setValue(getValue() + 1)
        if(getValue() >= maxValue) {
            setValue(0)
        }
        console.log('CE', getValue().toBinaryFormat());
    }
    if(enableOut) {
        setValueToBus(getValue())
        console.log('CO', getValue().toBinaryFormat());
    }
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)

export const useProgramCounter = () => {
    
    const setProgramCounterEnable = (state: boolean) => {
        enable = state
    }

    const setProgramCounterOut = (state: boolean) => {
        enableOut = state
    }

    return {
        setProgramCounterEnable,
        setProgramCounterOut
    }
}
