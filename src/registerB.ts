import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let enableOut = false
let enableIn = false

const onTick = () => {
    if(enableOut) {
    }        
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)

export const useRegisterB = () => {

    const setValue = (value: number) => {
        setBinaryValue(value)
    }

    const getValue = (): number => {
        return getBinaryValue()
    }

    return {
        setValue,
        getValue
    }
}
