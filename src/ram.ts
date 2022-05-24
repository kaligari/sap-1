import { useBus } from "./bus"
import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { useRegister } from "./useRegister"
import { useMemoryAddress } from "./memoryAddress"
import { program, programLineToNumber } from "./instructions"

const { getValue, setValue } = useRegister(16)
const { setValue: setValueToBus } = useBus()
const { getValue: getMemoryAddressValue } = useMemoryAddress()
let value = 0
let ramOut = false

program.forEach((item, address) => setValue(programLineToNumber(item), address))

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