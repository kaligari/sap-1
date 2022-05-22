import { eventBus, IPayload } from "./eventBus";
import { EEvents } from "./events";

let value = 0

const onBusUpdate = (payload?: IPayload) => {
    if(payload?.value !== undefined) {
        value = payload?.value
        eventBus.publish(EEvents.BUS_UPDATE, { value: value })
    }
}

eventBus.subscribe(EEvents.ALU_SUM_OUT, onBusUpdate)
eventBus.subscribe(EEvents.PROGRAM_COUNTER_CHANGE, onBusUpdate)

export const useBus = () => {
    
    return {
        value
    }
}