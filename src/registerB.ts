import { useBus } from "./bus"
import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let enableIn = false

const { value: valueFromBus } = useBus()

const onTick = () => {
    if(enableIn) {
        setTimeout(() => {
            setBinaryValue(valueFromBus())
            eventBus.publish(EEvents.REGISTER_B_CHANGE, { value: getBinaryValue() })
            console.log('BI', getBinaryValue().toBinaryFormat())
        })
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

    const setRegisterBIn = (state: boolean) => {
        enableIn = state
    }

    return {
        setValue,
        getValue,
        setRegisterBIn
    }
}
