class XTEventBus {
    constructor() {
        this.eventBusMap = new Map()
    }
    on(eventName, eventFn, thisArgs) {
       let eventFns = this.eventBusMap.get(eventName)
       if(!eventFns) {
         this.eventBusMap.set(eventName, eventFns = new Set())
       }
       if(thisArgs) {
        eventFns.add(eventFn.bind(thisArgs))
       } else { 
        eventFns.add(eventFn)
       }
    }
    off(eventName, eventFn) {
        const eventFns = this.eventBusMap.get(eventName)
        if(!eventFns) return
        eventFns.delete(eventFn)
        if(eventFns.size == 0) {
            this.eventBusMap.delete(eventName)
        }
    }
    emit(eventName, ...args) {
        const eventFns = this.eventBusMap.get(eventName)
        if(!eventFns) return
        eventFns.forEach(fn => fn(...args))
    }
}

const xtEventBus = new XTEventBus()
const fn = (a, b) => {
    console.log('on click', a, b);
}
const dbFn = (a, b, c) => {
    console.log('dbclick', a, b, c);
}

xtEventBus.on('click', fn)
xtEventBus.on('dbclick', dbFn)

xtEventBus.emit('click', 123, 'aa')
xtEventBus.emit('dbclick', 'das', 'aa',123)

xtEventBus.off('click', fn)
xtEventBus.emit('dbclick', 123, 'aa')
xtEventBus.emit('click', 123, 'aa')
console.log(xtEventBus);