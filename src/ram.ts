import { eventBus, IPayload } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"

const { getValue, setValue } = useRegister(16)
let value = 0

setValue(0b00011110, 0b0000)
setValue(0b00101111, 0b0001)
setValue(0b11100000, 0b0010)

setValue(0b00011100, 0b1110)
setValue(0b00001110, 0b1111)

const onMemoryAddressChange = (payload?: IPayload) => {
    value = getValue(payload?.value)
    eventBus.publish(EEvents.RAM_CONTENT_CHANGE, { value })
    console.log('RAM content', value.toString(2).padStart(8, '0'));
}

eventBus.subscribe(EEvents.MEMORY_ADDRESS_CHANGE, onMemoryAddressChange)

export const useRAM = () => {

}