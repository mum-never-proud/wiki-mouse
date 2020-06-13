import { _running, _paused, _eventHandler, _streamHandler } from './constants/symbols';
import defaultConfig from './constants/config';
import eventHandler from './utils/event-handler';
import store from './store';
import streamHandler from './utils/stream-handler';

class WikiEvents {
  constructor(config = {}) {
    this.config = { ...defaultConfig, ...config };
    this[_eventHandler] = eventHandler.bind(this);
    this[_streamHandler] = streamHandler.bind(this);
    this[_paused] = false;
    this[_running] = false;

    store.document = document.documentElement.cloneNode(true);
    store.dimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    store.since = Date.now();

    if (!this.config.defer) {
      this.start();
    }

    return this;
  }

  start() {
    if (!this[_running]) {
      const isStream = typeof this.config.stream === 'function';

      if (isStream) {
        this.config.stream({
          type: 'config',
          ...store
        });
      }

      this.config.trackEvents.forEach(ev => document.addEventListener(
        ev, isStream ? this[_streamHandler] : this[_eventHandler])
      );

      return this;
    }
  }

  pause() {
    this[_paused] = true;

    return this;
  }

  resume() {
    this[_paused] = false;

    return this;
  }

  stop() {
    this.config.trackEvents.forEach(ev => {
      document.removeEventListener(ev, this[_streamHandler]);
      document.removeEventListener(ev, this[_eventHandler]);
    });

    return this;
  }

  peekEvents() {
    return store.events;
  }

  dump() {
    return store;
  }
}

module.exports = WikiEvents;
