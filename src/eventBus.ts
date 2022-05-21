interface ISubscription {
    eventType: string
    id: number
    callback: () => void
}

class EventBus {
    subscriptions: ISubscription[] = []
    getNextUniqueId = this.getIdGenerator()
    
    subscribe(eventType: string, callback: () => void) {
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
    
    publish(eventType: string) {
        this.subscriptions
            .filter(item => item.eventType === eventType)
            .forEach(item => item.callback())
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