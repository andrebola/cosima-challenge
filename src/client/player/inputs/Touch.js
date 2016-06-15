import { TouchSurface } from 'soundworks/client';

export default class Touch {
  constructor($el) {
    this.$el = $el;
    this.listeners = new Set();

    this._onTouch = this._onTouch.bind(this);
  }

  addListener(func) {
    this.listeners.add(func);
  }

  removeListener(func) {
    this.listeners.delete(func);
  }

  start() {
    this.surface = new TouchSurface(this.$el);
    this.surface.addListener('touchstart', this._onTouch);
  }

  stop() {
    this.surface.removeListener('touchstart', this._onTouch);
    this.surface = null;
  }

  _onTouch(touchId, normX, normY) {
    this.listeners.forEach((callback) => callback());
  }
}
