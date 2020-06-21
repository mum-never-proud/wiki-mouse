import { assertFunction } from './assert';
import { _paused } from '../constants/symbols';

export default function(ev) {
  if (!this[_paused]) {
    assertFunction(this.config.stream);

    this.config.stream({
      type: 'event',
      eventType: ev.type,
      eventTarget: ev.target,
      x: ev.clientX,
      y: ev.clientY
    });
  }
}
