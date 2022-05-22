import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue, setValue } = useRegister()
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
        eventBus.publish(EEvents.PROGRAM_COUNTER_TO_BUS, { value: getValue() })
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
