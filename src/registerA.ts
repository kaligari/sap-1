import { eventBus, IPayload } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let enableOut = false
let enableIn = false
let valueFromBus: number|null = null

const onBusUpdate = (payload?: IPayload) => {
    valueFromBus = payload?.value || null
}

const onTick = () => {
    if(enableIn && valueFromBus !== null) {
        setBinaryValue(valueFromBus)
        valueFromBus = null
        eventBus.publish(EEvents.REGISTER_A_CHANGE, { value: getBinaryValue() })
        // console.log('register a', getBinaryValue().toString(2).padStart(4, '0'))
    }
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)
eventBus.subscribe(EEvents.BUS_UPDATE, onBusUpdate)

export const useRegisterA = () => {

    const setValue = (value: number) => {
        valueFromBus = value
    }

    const getValue = (): number => {
        return getBinaryValue()
    }

    const setRegisterAIn = (state: boolean) => {
        enableIn = state
    }

    const setRegisterAOut = (state: boolean) => {
        enableOut = state
    }
    
    return {
        setValue,
        getValue,
        setRegisterAIn,
        setRegisterAOut
    }
}