import { eventBus } from "./eventBus"
import { EEvents } from "./evets"

class Clock extends EventTarget {
    #frequency = 100
    #interval = 1
  
    constructor() {
      super()
    }

    startTicking(hz: number) {
      clearInterval(this.#interval)
      if(hz < 0) {
        throw Error('Invalid clock frequency')
      }
      this.#frequency = hz
      let tickOn = true
    //   let event
      this.#interval = setInterval(() => {
        if(tickOn) {
          console.log('tick-on')
          eventBus.publish(EEvents.CLOCK_TICK_ON)
        //   event = new CustomEvent('clock-tick-on')
        } else {
          // console.log('tick-off')
          eventBus.publish(EEvents.CLOCK_TICK_OFF)
        //   event = new CustomEvent('clock-tick-off')
        }
        // this.dispatchEvent(event)
        tickOn = !tickOn
      }, Math.floor(1 / this.#frequency * 1000 / 2))
    }
    
  }
  
export const clock = new Clock()