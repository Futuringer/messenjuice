export type Handler = (...args: any) => void;

class EventBus {
  listeners: Record<string, Handler[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Handler) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  off(event: string, callback: Handler) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}

export const eventBus = new EventBus();

export default EventBus;
