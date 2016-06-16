
export class MovingAverage {
  constructor(order = 1) {
    this.order = order;
    this.index = 0;
    this.stack = new Array(this.order);

    for (let i = 0; i < this.order; i++)
      this.stack[i] = 0;
  }

  process(value) {
    this.stack[this.index] = value;
    let sum = 0;

    for (let i = 0; i < this.order; i++)
      sum += this.stack[i];

    this.index = (this.index + 1) % this.order;
    return sum / this.order;
  }
}

export class MovingAverageVector {
  constructor(vectorSize, order = 1) {
    this.vectorSize = vectorSize;
    this.order = order;
    this.index = 0;

    this.stack = new Array(vectorSize);
    this.sums = new Array(vectorSize);

    for (let i = 0; i < vectorSize; i++) {
      this.stack[i] = new Array(this.order);
      this.sums[i] = 0;

      for (let j = 0; j < this.order; j++)
        this.stack[i][j] = 0;
    }
  }

  process(arr) {
    for (let i = 0; i < this.vectorSize; i++) {
      this.stack[i][this.index] = arr[i];
      this.sums[i] = 0;

      for (let j = 0; j < this.order; j++)
        this.sums[i] += this.stack[i][j];

      this.sums[i] = this.sums[i] / this.order;
    }

    this.index = (this.index + 1) % this.order;
    return this.sums;
  }
}
