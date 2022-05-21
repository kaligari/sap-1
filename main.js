class OneByteRegister {
  #dataView
  
	constructor() {
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

class Bus extends OneByteRegister {
  constructor() {
    super()
  }
}

class Register extends OneByteRegister {
  #dataView
  #registerIn // ?
  #registerOut // ?

	constructor(bus) {
    super()
    // connect to the bus
  	this.bus = bus
  }

  registerIn() {
    this.value = this.bus.value
  }

  registerOut() {
    this.bus.value = this.value
  }
  
}

// class RAM {
//   #dataView
//   constructor() {
//     // init internal register
//   	this.valueArray = new Int8Array(1)
//     this.#dataView = new DataView(this.valueArray.buffer)
//   }
  
//   get value() {
//     return this.#dataView.getInt8(0)
//   }

//   set value(value) {
//     this.#dataView.setInt8(0, value)
//   }
// }

const bus = new Bus(8)
const registerA = new Register(bus)
const registerB = new Register(bus)

const checkStatus = (Cycle = '----') => {
  console.log(`---- ${Cycle} ----`);
  console.log('bus', bus.value)
  console.log('registerA', registerA.value)
  console.log('registerB', registerB.value)

}

checkStatus('Init')
registerA.value = 55
checkStatus('Set reg a value')
registerA.registerOut()
checkStatus('Enable register A Out')
registerB.registerIn()
checkStatus('Enable register B In')