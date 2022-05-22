import { eventBus, IPayload } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue, setValue } = useRegister()
let enableOut = false
let enable = false
let maxValue = 16

const onTick = () => {
    if(enable) {
       console.log('program counter', getValue().toString(2).padStart(4, '0'))
        setValue(getValue() + 1)
        if(getValue() >= maxValue) {
            setValue(0)
        }
    }
    if(enableOut) {
        eventBus.publish(EEvents.PROGRAM_COUNTER_CHANGE, { value: getValue() })
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
