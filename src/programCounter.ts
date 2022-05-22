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
        console.log('program counter', getValue())
    }        
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)

export const useProgramCounter = () => {
    
    const setEnable = (state: boolean) => {
        enable = state
    }

    const setEnableOut = (state: boolean) => {
        enableOut = state
    }

    return {
        setEnable,
        setEnableOut
    }
}
