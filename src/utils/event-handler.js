import { _paused } from '../constants/symbols';
import store from '../store';

export default function(ev) {
  if (!this[_paused]) {
    store.frames.push({
      type: 'event',
      eventType: ev.type,
      eventTarget: ev.target,
      x: ev.clientX,
      y: ev.clientY
    });
  }
}
