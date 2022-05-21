export class Register {
    #valueArray
    #dataView

    constructor() {        
        this.#valueArray = new Uint8Array(1)
        this.#dataView = new DataView(this.#valueArray.buffer)
    }

    get value() {
        return this.#dataView.getInt8(0)
    }

    set value(value) {
        this.#dataView.setInt8(0, value)
    }

    // get valueBinary() {
    //     return (this.#dataView.getInt8(0) >>> 0).toString(2).padStart(4, '0')
    //     // return this.#dataView.getInt8(0)
    // }

    // set valueBinary(value: string) {
    //     this.#dataView.setInt8(0, parseInt(value))
    // }
}