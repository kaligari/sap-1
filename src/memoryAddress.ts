import { eventBus, IPayload } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let enableOut = false
let memoryIn = false
let valueFromBus: number|null = null

const onBusUpdate = (payload?: IPayload) => {
    valueFromBus = payload?.value || null
}

const onTick = () => {
    if(memoryIn && valueFromBus !== null) {
        setBinaryValue(valueFromBus)
        valueFromBus = null
        eventBus.publish(EEvents.MEMORY_ADDRESS_CHANGE, { value: getBinaryValue() })
        console.log('memory address', getBinaryValue().toString(2).padStart(4, '0'));
        
    }      
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)
eventBus.subscribe(EEvents.BUS_UPDATE, onBusUpdate)

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
