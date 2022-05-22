import { eventBus } from "./eventBus";
import { EEvents } from "./evets";
import { Register } from "./Register";
import { registerA } from "./registerA";
import { registerB } from "./registerB";

class ALU extends Register {
    #sumOut = false

    constructor() {
        super()
        this.sumRegisters()
        eventBus.subscribe(EEvents.REGISTER_A_CHANGE, this.sumRegisters)
        eventBus.subscribe(EEvents.REGISTER_B_CHANGE, this.sumRegisters)
    }

    get sumOut() {
        return this.#sumOut
    }

    set sumOut(value) {
        this.#sumOut = value
        this.sumRegisters()
    }
    
    sumRegisters = () => {
        this.value = registerA.value + registerB.value
        if(this.#sumOut) {            
            eventBus.publish(EEvents.ALUS_SUM_OUT, { value: this.value })
        }
    }
}

export const alu = new ALU()