import { TouchSurface } from 'soundworks/client';

export default class Touch {
  constructor($el, holdDuration) {
    this.$el = $el;
    this.holdDuration = holdDuration;
    this.listeners = new Set();

    this._onTouchStart = this._onTouchStart.bind(this);
    this.touches = {};
  }

  addListener(func) {
    this.listeners.add(func);
  }

  removeListener(func) {
    this.listeners.delete(func);
  }

  start() {
    this.surface = new TouchSurface(this.$el);
    this.surface.addListener('touchstart', this._onTouchStart);
    this.surface.addListener('touchend', this._onTouchStart);
  }

  stop() {
    this.surface.removeListener('touchstart', this._onTouchStart);
    this.surface.removeListener('touchend', this._onTouchStart);
    this.surface = null;
  }

  _onTouchStart(touchId, normX, normY) {
    this.listeners.forEach((callback) => callback(touchId, true));
  }

  _onTouchEnd(touchId, normX, normY) {
    this.listeners.forEach((callback) => callback(touchId, false));
  }
}
