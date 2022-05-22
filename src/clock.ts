import { eventBus } from "./eventBus"
import { EEvents } from "./events"

let frequency = 100
let interval = 1
let halt = false

export const useClock = () => {
    
    const startTicking = (hz: number) => {
      clearInterval(interval)
      if(hz < 0) {
        throw Error('Invalid clock frequency')
      }
      frequency = hz
      let tickOn = true
      console.time()
      interval = setInterval(() => {
        if(halt) {
          clearInterval(interval)
          console.log('HLT')
          console.timeEnd()
          
        }
        if(tickOn) {
          // console.log('tick-on')
          eventBus.publish(EEvents.CLOCK_TICK_ON)
        } else {
          // console.log('tick-off')
          eventBus.publish(EEvents.CLOCK_TICK_OFF)
        }
        // this.dispatchEvent(event)
        tickOn = !tickOn
      }, Math.floor(1 / frequency * 1000 / 2))
    }

    const setClockHalt = (state: boolean) => {
      halt = state
    }

    return {
      startTicking,
      setClockHalt
    }
    
}