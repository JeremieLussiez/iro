let instance = null;

export default class EventRouter {

    constructor() {
        if (instance == null) {
            this.eventsListeners = {};
            instance = this;
        }
        return instance;
    }

    listen(eventName, listener) {
        let eventListeners = this.eventsListeners[eventName];
        if (!eventListeners) {
            eventListeners = [];
            this.eventsListeners[eventName] = eventListeners;
        }
        eventListeners.push(listener);
    }

    emit(eventName, data) {
        let listenedTimes = 0;
        let listeners = this.eventsListeners[eventName];
        if (listeners) {
            listenedTimes = listeners.length;
            let listenerCallbackName = "on" + eventName;
            for (let listener of listeners) {
                if (listener && listener[listenerCallbackName]) {
                    listener[listenerCallbackName](data);
                } else {
                    listenedTimes--;
                }
            }
        }
        return listenedTimes;
    }

}

