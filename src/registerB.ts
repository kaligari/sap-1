import { eventBus } from "./eventBus"
import { Register } from "./Register"

class RegisterB extends Register {
    enableOut = false
    enableIn = false

    constructor() {
        super()
        eventBus.subscribe('clock-tick-on', this.onTick)
    }
    
    onTick = () => {
        if(this.enableOut) {
        }        
    }
}

export const registerB = new RegisterB()