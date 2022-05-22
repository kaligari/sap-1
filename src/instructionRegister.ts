import { useBus } from "./bus"
import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let enableOut = false
let enableIn = false

const { value: valueFromBus } = useBus()

const onTick = () => {
    if(enableIn) {
        setTimeout(() => {
            setBinaryValue(valueFromBus())
            eventBus.publish(EEvents.INSTRUCTION_REGISTER_CHANGE, { value: getBinaryValue() })
            console.log('II', getBinaryValue().toBinaryFormat(8));
        })
    }
    if(enableOut) {
        eventBus.publish(EEvents.INSTRUCTION_REGISTER_TO_BUS, { value: (getBinaryValue() & 0b1111) })
        console.log('IO', (getBinaryValue() & 0b1111).toBinaryFormat())
    }
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)

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
