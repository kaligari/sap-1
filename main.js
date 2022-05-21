class OneByteRegister extends EventTarget {
  #dataView
  
	constructor() {
    super()
    // init internal register
  	this.valueArray = new Int8Array(1)
    this.#dataView = new DataView(this.valueArray.buffer)
  }
  
  get value() {
    return this.#dataView.getInt8(0)
  }

  set value(value) {
    this.#dataView.setInt8(0, value)
  }
}

class EventBus extends EventTarget {
  
  #registerIn

  constructor() {
    super()
    this.addEventListener('bus-in', src => {
      this.value = src.detail

      const event = new CustomEvent('bus-out', { bubbles: true })
      this.dispatchEvent(event)
    })
  }
}

class Register extends OneByteRegister {
  name
  #eventBus
  #registerIn = false
  #registerOut = false

	constructor(name, eventBus) {
    super()
    this.#eventBus = eventBus
    this.name = name
    this.addEventListener('bus-out', () => {
      console.log('XX', this.name);
      if(this.#registerIn) {
          this.readFromBus()
      }
    })
  }

  readFromBus() {
    this.value = this.#eventBus.value
  }

  registerIn() {
    this.#registerIn = true
    this.readFromBus()
  }

  registerOut() {
    this.#registerOut = true
    const event = new CustomEvent('bus-in', { detail: this.value })
    this.#eventBus.dispatchEvent(event)
  }

  closeIO() {
    if(this.#registerOut) {
      const event = new CustomEvent('bus-in', { detail: 0 })
      this.#eventBus.dispatchEvent(event)
    }
    this.#registerIn = false
    this.#registerOut = false
  }
  
}

// const bus = new Bus()
const eventBus = new EventBus()
const registerA = new Register('registerA', eventBus)
const registerB = new Register('registerB', eventBus)

const checkStatus = (Cycle = '----') => {
  console.log(`---- ${Cycle} ----`);
  console.log('bus', eventBus.value)
  console.log('registerA', registerA.value)
  console.log('registerB', registerB.value)

}

console.clear()
checkStatus('Init')
registerA.value = 11
checkStatus('Set reg a value')


registerB.registerIn()
checkStatus('Enable register B In')

registerA.registerOut()
checkStatus('Enable register A Out')

registerA.closeIO()
registerB.closeIO()
checkStatus('Close registers I/O')

registerB.value = 55
checkStatus('Set reg b value')