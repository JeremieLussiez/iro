let instance = null;

export default class EventRouter {
  constructor() {
    if (instance === null) {
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
    const listeners = this.eventsListeners[eventName];
    if (listeners) {
      listenedTimes = listeners.length;
      const listenerCallbackName = `on${eventName}`;
      listeners.forEach((listener) => {
        if (listener && listener[listenerCallbackName]) {
          listener[listenerCallbackName](data);
        } else {
          listenedTimes--;
        }
      });
    }
    return listenedTimes;
  }
}
