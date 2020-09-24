type EventCallback = (...args: any[]) => void;

export default class EventEmitter {
  private _events: Map<string | Symbol, Set<EventCallback>>;

  constructor() {}

  on(event: string | Symbol, callback: EventCallback) {
    if (!this._events.has(event)) {
      this._events.set(event, new Set<EventCallback>());
    }
    this._events.get(event).add(callback);
  }

  off(event: string | Symbol, callback: EventCallback = undefined) {
    if (callback !== undefined) {
      if (this._events.has(event)) {
        if (this._events.get(event).has(callback)) {
          this._events.get(event).delete(callback);
        }
      }
    } else {
      if (this._events.has(event)) {
        this._events.get(event).clear();
      }
    }
  }

  once(event: string | Symbol, callback: EventCallback) {
    const onceCallback: EventCallback = (...args: any[]) => {
      callback(...args);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }

  emit(event: string | Symbol, ...args: any[]) {
    if (this._events.has(event)) {
      this._events.get(event).forEach((callback) => {
        callback(...args);
      });
    }
  }
}
