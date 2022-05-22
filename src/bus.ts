import { eventBus, IPayload } from "./eventBus";
import { EEvents } from "./events";

let value = 0

const onBusUpdate = (payload?: IPayload) => {
    if(payload?.value) {
        value = payload?.value
        eventBus.publish(EEvents.BUS_UPDATE, { value: value })
    }
}

eventBus.subscribe(EEvents.ALUS_SUM_OUT, onBusUpdate)

export const useBus = () => {
    
    return {
        value
    }
}