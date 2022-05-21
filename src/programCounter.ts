import { eventBus } from "./eventBus"

export class ProgramCounter {
    enableOut = false
    enableIn = true
    #maxValue = 16
    #valueArray
    #dataView

    constructor(maxValue = 16) {
        this.#maxValue = maxValue
        this.#valueArray = new Uint8Array(1)
        this.#dataView = new DataView(this.#valueArray.buffer)
        eventBus.subscribe('clock-tick-on', this.onTick)
    }

    get value() {
        return this.#dataView.getInt8(0)
    }

    set value(value) {
        this.#dataView.setInt8(0, value)
    }

    onTick = () => {
        if(this.enableIn) {
            this.value = this.value + 1
            if(this.value >= this.#maxValue) {
                this.value = 0
            }
            console.log('program counter', this.#dataView.getInt8(0))
        }        
    }
}