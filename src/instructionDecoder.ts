import { eventBus, IPayload } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue: getBinaryValue, setValue: setBinaryValue } = useRegister()
let instructionRegister = 0

const onInstructionRegisterChange = (payload?: IPayload) => {
    instructionRegister = payload?.value || 0
}

const onTickOff = () => {
    setBinaryValue(getBinaryValue() + 1)
    if(getBinaryValue() >= 8) {
        setBinaryValue(0)
    }
    console.log('microinstruction', instructionRegister.toString(2).padStart(4, '0'), getBinaryValue().toString(2).padStart(4, '0'));
    
}

eventBus.subscribe(EEvents.CLOCK_TICK_OFF, onTickOff)
eventBus.subscribe(EEvents.INSTRUCTION_REGISTER_CHANGE, onInstructionRegisterChange)

export const useInstructionDecoder = () => {

}