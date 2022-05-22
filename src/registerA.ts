import { eventBus, IPayload } from "./eventBus"
import { EEvents } from "./evets"
import { Register } from "./Register"

class RegisterA extends Register {
    enableOut = false
    enableIn = false
    #valueFromBus: number|null = null

    constructor() {
        super()
        eventBus.subscribe(EEvents.CLOCK_TICK_ON, this.onTick)
        eventBus.subscribe(EEvents.BUS_UPDATE, this.onBusUpdate)
    }

    onBusUpdate = (payload?: IPayload) => {
        this.#valueFromBus = payload?.value || null
    }

    onTick = () => {
        if(this.enableIn && this.#valueFromBus !== null) {
            this.value = this.#valueFromBus
            this.#valueFromBus = null
            eventBus.publish(EEvents.REGISTER_A_CHANGE, { value: this.value })
            console.log('registerA', this.value)
        }
    }

}

export const registerA = new RegisterA()