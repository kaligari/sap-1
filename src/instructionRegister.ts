import { useBus } from "./bus"
import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let enableOut = false
let enableIn = false

const { value: valueFromBus, setValue } = useBus()

const onTick = () => {
    if(enableIn) {
        setTimeout(() => {
            setBinaryValue(valueFromBus())
            console.log('II', getBinaryValue().toBinaryFormat(8));
        })
    }
    if(enableOut) {
        const shifted = getBinaryValue() & 0b1111
        setValue(shifted)
        console.log('IO', shifted.toBinaryFormat())
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
