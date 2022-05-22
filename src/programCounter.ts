import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { Register } from "./Register"

class ProgramCounter extends Register {
    enableOut = false
    enable = false
    #maxValue
    // TODO
    // Counter out
    // Jump


    constructor(maxValue = 16) {
        super()
        this.#maxValue = maxValue
        eventBus.subscribe(EEvents.CLOCK_TICK_ON, this.onTick)
    }
    
    onTick = () => {
        if(this.enable) {
            this.onEnable()
        }        
    }

    onEnable() {
        this.value = this.value + 1
        if(this.value >= this.#maxValue) {
            this.value = 0
        }
        console.log('program counter', this.value)
    }
}

export const programCounter = new ProgramCounter()