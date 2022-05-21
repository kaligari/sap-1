import { eventBus, IPayload } from "./eventBus";
import { Register } from "./Register";

export class Bus extends Register {
    alu: Register
    
    constructor(alu: Register) {
        super()
        this.alu = alu
        this.value = 0
        eventBus.subscribe('alu-sum-out', this.onBusUpdate)
    }

    onBusUpdate = (payload?: IPayload) => {
        if(payload?.value) {
            this.value = payload?.value
            eventBus.publish('bus-update', { value: this.value })
        }
    }
}