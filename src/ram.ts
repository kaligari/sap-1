import { useBus } from "./bus"
import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"
import { useMemoryAddress } from "./memoryAddress"

const { getValue, setValue } = useRegister(16)
const { setValue: setValueToBus } = useBus()
const { getValue: getMemoryAddressValue } = useMemoryAddress()
let value = 0
let ramOut = false

setValue(0b00011110, 0b0000)
setValue(0b00101111, 0b0001)
setValue(0b11100000, 0b0010)
setValue(0b11110000, 0b0011)

setValue(0b00011100, 0b1110)
setValue(0b00001110, 0b1111)

const onTick = () => {
    if(ramOut) {
        value = getValue(getMemoryAddressValue())
        setValueToBus(value)
        console.log('RO', value.toBinaryFormat())
    }
}

eventBus.subscribe(EEvents.CLOCK_TICK_ON, onTick)

export const useRAM = () => {
    const setRamOut = (state: boolean) => {
        ramOut = state
    }

    return {
        setRamOut
    }
}