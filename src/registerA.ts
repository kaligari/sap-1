import { eventBus, IPayload } from "./eventBus"
import { Register } from "./Register"

class RegisterA extends Register {
    enableOut = false
    enableIn = false
    #valueFromBus: number|null = null

    constructor() {
        super()
        eventBus.subscribe('clock-tick-on', this.onTick)
        eventBus.subscribe('bus-update', this.onBusUpdate)
    }

    onBusUpdate = (payload?: IPayload) => {
        this.#valueFromBus = payload?.value || null
    }

    onTick = () => {
        if(this.enableIn && this.#valueFromBus !== null) {
            this.value = this.#valueFromBus
            this.#valueFromBus = null
            eventBus.publish('register-a-change', { value: this.value })
            console.log('registerA', this.value)
        }
    }

}

export const registerA = new RegisterA()