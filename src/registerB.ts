import { eventBus } from "./eventBus"
import { Register } from "./Register"

export class RegisterB extends Register {
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