import { eventBus } from "./eventBus"

export class Clock extends EventTarget {
    #frequency = 100
  
    constructor(hz: number) {
      super()
      if(hz < 0) {
        throw Error('Invalid clock frequency')
      }
      this.#frequency = hz
    }
  
    startTicking() {
      let tickOn = true
    //   let event
      setInterval(() => {
        if(tickOn) {
          console.log('tick-on')
          eventBus.publish('clock-tick-on')
        //   event = new CustomEvent('clock-tick-on')
        } else {
          console.log('tick-off')
          eventBus.publish('clock-tick-off')
        //   event = new CustomEvent('clock-tick-off')
        }
        // this.dispatchEvent(event)
        tickOn = !tickOn
      }, Math.floor(1 / this.#frequency * 1000 / 2))
    }
    
  }
  
