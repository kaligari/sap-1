import { eventBus, IPayload } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let enableIn = false
let valueFromBus: number|null = null

const onBusUpdate = (payload?: IPayload) => {
    valueFromBus = payload?.value || null
}

const onTick = () => {
    if(enableIn && valueFromBus !== null) {
        setBinaryValue(valueFromBus)
        console.log('output register', getBinaryValue().toString(2).padStart(4, '0'));  
    }      
    valueFromBus = null
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)
eventBus.subscribe(EEvents.BUS_UPDATE, onBusUpdate)

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
