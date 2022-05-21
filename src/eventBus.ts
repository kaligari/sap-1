export interface IPayload {
    value: number
}

interface ISubscription {
    eventType: string
    id: number
    callback: (payload?: IPayload) => void
}

class EventBus {
    subscriptions: ISubscription[] = []
    getNextUniqueId = this.getIdGenerator()
    
    subscribe(eventType: string, callback: (payload?: IPayload) => void) {
        const id = this.getNextUniqueId()
    
        this.subscriptions.push({
            eventType,
            id,
            callback
        })
    
        return { 
            unsubscribe: () => {
                const idx = this.subscriptions.findIndex(item => item.id === id)
                this.subscriptions.splice(idx, 1)
            }
        }
    }
    
    publish(eventType: string, payload?: IPayload) {
        this.subscriptions
            .filter(item => item.eventType === eventType)
            .forEach(item => item.callback(payload))
    }
    
    getIdGenerator() {
        let lastId = 0
        
        return function getNextUniqueId() {
            lastId += 1
            return lastId
        }
    }
}

export const eventBus = new EventBus()