import { eventBus, IPayload } from "./eventBus";
import { EEvents } from "./evets";
import { Register } from "./Register";

class Bus extends Register {
    
    constructor() {
        super()
        this.value = 0
        eventBus.subscribe(EEvents.ALUS_SUM_OUT, this.onBusUpdate)
    }

    onBusUpdate = (payload?: IPayload) => {
        if(payload?.value) {
            this.value = payload?.value
            eventBus.publish(EEvents.BUS_UPDATE, { value: this.value })
        }
    }
}

export const bus = new Bus()