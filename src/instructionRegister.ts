import { eventBus, IPayload } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let enableOut = false
let enableIn = false
let valueFromBus: number|null = 0

const onBusUpdate = (payload?: IPayload) => {
    if(payload?.value !== undefined) {
        valueFromBus = payload?.value
    }
    
}

const onTick = () => {
    if(enableIn && valueFromBus !== null) {
        setBinaryValue(valueFromBus)
        eventBus.publish(EEvents.INSTRUCTION_REGISTER_CHANGE, { value: getBinaryValue() })
        // console.log('instruction register', getBinaryValue().toString(2).padStart(4, '0'));
    }
    valueFromBus = null
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)
eventBus.subscribe(EEvents.BUS_UPDATE, onBusUpdate)

export const useInstructionRegister = () => {

    const setValue = (value: number) => {
        setBinaryValue(value)
    }

    const getValue = (): number => {
        return getBinaryValue()
    }

    const setInstructionRegisterIn = (state: boolean) => {
        enableIn = state
    }

    const setInstructionRegisterOut = (state: boolean) => {
        enableOut = state
    }

    return {
        setValue,
        getValue,
        setInstructionRegisterIn,
        setInstructionRegisterOut
    }
}
