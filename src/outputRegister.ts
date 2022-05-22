import { useBus } from "./bus"
import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let enableIn = false

const { value: valueFromBus } = useBus()

const onTick = () => {
    if(enableIn) {
        setBinaryValue(valueFromBus())
        console.log('--- OI RESULT ---: ', getBinaryValue()); 
    }
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)

export const useOutputRegister = () => {

    const setValue = (value: number) => {
        setBinaryValue(value)
    }

    const getValue = (): number => {
        return getBinaryValue()
    }

    const setOutputRegisterIn = (state: boolean) => {
        enableIn = state
    }

    return {
        setValue,
        getValue,
        setOutputRegisterIn
    }
}
