import { eventBus, IPayload } from "./eventBus";
import { EEvents } from "./events";

let value = 0

const emitBusUpdate = (payload?: IPayload) => {
    if(payload?.value !== undefined) {
        value = payload?.value
    }
}

eventBus.subscribe(EEvents.ALU_SUM_OUT_TO_BUS, emitBusUpdate)
eventBus.subscribe(EEvents.PROGRAM_COUNTER_TO_BUS, emitBusUpdate)
eventBus.subscribe(EEvents.REGISTER_A_TO_BUS, emitBusUpdate)
eventBus.subscribe(EEvents.INSTRUCTION_REGISTER_TO_BUS, emitBusUpdate)
eventBus.subscribe(EEvents.RAM_CONTENT_TO_BUS, emitBusUpdate)

export const useBus = () => {
    
    return {
        value: () => value
    }
}