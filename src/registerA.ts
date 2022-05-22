import { useBus } from "./bus"
import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
const { setValue: setValueToBus } = useBus()
let enableOut = false
let enableIn = false

const { value: valueFromBus } = useBus()

const onTick = () => {
    if(enableIn) {
        setTimeout(() => {
            setBinaryValue(valueFromBus())
            console.log('AI', getBinaryValue().toBinaryFormat())
        })
    }
    if(enableOut) {
        // eventBus.publish(EEvents.REGISTER_A_TO_BUS, { value: getBinaryValue() })
        setValueToBus(getBinaryValue())
        console.log('AO', getBinaryValue().toBinaryFormat())
    }
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)

export const useRegisterA = () => {

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
        getValue,
        setRegisterAIn,
        setRegisterAOut
    }
}