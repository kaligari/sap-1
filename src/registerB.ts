import { eventBus } from "./eventBus"
import { EEvents } from "./events"
import { Register } from "./Register"

class RegisterB extends Register {
    enableOut = false
    enableIn = false

    constructor() {
        super()
        eventBus.subscribe(EEvents.CLOCK_TICK_ON, this.onTick)
    }
    
    onTick = () => {
        if(this.enableOut) {
        }        
    }
}

export const registerB = new RegisterB()