
export default class MovingAverage {
  constructor(order) {
    this.order = order;
    this.stack = new Array(this.order);
    this.currentIndex = 0;
  }

  process(value) {
    this.stack[this.index] = value;
    let sum = 0;

    for (let i = 0; i < this.order; i++)
      sum += this.stack[i];

    this.index = (this.index + 1) % this.order;
    return sum;
  }
}
