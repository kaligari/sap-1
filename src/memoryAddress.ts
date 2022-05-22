import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"
import { useBus } from "./bus"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let memoryIn = false

const { value: valueFromBus } = useBus()

const onTick = () => {
    if(memoryIn) {
        setTimeout(() => {
            setBinaryValue(valueFromBus())
            eventBus.publish(EEvents.MEMORY_ADDRESS_CHANGE, { value: getBinaryValue() })
            console.log('MI', getBinaryValue().toBinaryFormat(4)); 
        })
    }
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)

export const useMemoryAddress = () => {

    const setValue = (value: number) => {
        setBinaryValue(value)
    }

    const getValue = (): number => {
        return getBinaryValue()
    }

    const setMemoryIn = (state: boolean) => {
        memoryIn = state
    }

    return {
        setValue,
        getValue,
        setMemoryIn
    }
}
