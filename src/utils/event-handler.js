import { createSnapshot } from 'wiki-events-snapshot';
import { _paused } from '../constants/symbols';
import store from '../store';

export default function eventHandler(ev) {
  if (!this[_paused]) {
    const payload = {
      type: 'event',
      eventType: ev.type,
      eventTarget: createSnapshot(ev.target, false),
      x: ev.screenX || 0,
      y: ev.screenY || 0,
      sx: window.screenX || 0,
      sy: window.screenY || 0,
      timestamp: Date.now(),
    };

    if (this.isStream) {
      this.config.stream(payload);
    } else {
      store.frames.push(payload);
    }
  }
}
