import { _paused } from '../constants/symbols';
import store from '../store';

export default function(ev) {
  if (!this[_paused]) {
    store.events.push({
      type: 'event',
      eventType: ev.type,
      x: ev.clientX,
      y: ev.clientY
    });
  }
}
