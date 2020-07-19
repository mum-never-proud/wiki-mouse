/* eslint-disable class-methods-use-this */
import { createSnapshot } from 'wiki-events-snapshot';
import {
  _running,
  _paused,
  _eventHandler,
  _mutationHandler,
  _mutationObserver,
} from './constants/symbols';
import defaultConfig, { mutationObserverConfig } from './constants/config';
import eventHandler from './utils/event-handler';
import mutationsHandler from './utils/mutation-handler';
import store from './store';

class WikiEvents {
  constructor(config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.isStream = typeof this.config.stream === 'function';
    this[_eventHandler] = eventHandler.bind(this);
    this[_mutationHandler] = mutationsHandler.bind(this);
    this[_mutationObserver] = new MutationObserver(this[_mutationHandler]);
    this[_paused] = false;
    this[_running] = false;
    store.dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    store.since = Date.now();
    store.snapshot = createSnapshot(document);

    if (!this.config.defer) {
      this.start();
    }

    return this;
  }

  start() {
    if (!this[_running]) {
      if (this.isStream) {
        this.config.stream({
          ...store,
          type: 'config',
          timestamp: Date.now(),
        });
      }

      this[_mutationObserver].observe(document.documentElement, mutationObserverConfig);
      this.config.trackEvents.forEach((ev) => document.addEventListener(ev, this[_eventHandler]));
    }

    return this;
  }

  pause() {
    this[_paused] = true;

    this[_mutationObserver].disconnect();

    return this;
  }

  resume() {
    this[_paused] = false;

    this[_mutationObserver].observe(document.documentElement, mutationObserverConfig);

    return this;
  }

  stop() {
    this.config.trackEvents.forEach((ev) => document.removeEventListener(ev, this[_eventHandler]));
    this[_mutationObserver].disconnect();

    return this;
  }

  peekEvents() {
    return store.events;
  }

  peekMutations() {
    return store.mutations;
  }

  dump() {
    return store;
  }

  toString() {
    return JSON.stringify(store);
  }
}

module.exports = WikiEvents;
