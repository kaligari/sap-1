import { eventBus } from "./eventBus";
import { Register } from "./Register";
import { registerA } from "./registerA";
import { registerB } from "./registerB";

class ALU extends Register {
    registerA: Register
    registerB: Register
    #sumOut = false

    constructor(registerA: Register, registerB: Register) {
        super()
        this.registerA = registerA
        this.registerB = registerB
        this.sumRegisters()
        eventBus.subscribe('register-a-change', this.sumRegisters)
        eventBus.subscribe('register-b-change', this.sumRegisters)
    }

    get sumOut() {
        return this.#sumOut
    }

    set sumOut(value) {
        this.#sumOut = value
        this.sumRegisters()
    }
    
    sumRegisters = () => {
        this.value = this.registerA.value + this.registerB.value
        if(this.#sumOut) {            
            eventBus.publish('alu-sum-out', { value: this.value })
        }
    }
}

export const alu = new ALU(registerA, registerB)