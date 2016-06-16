"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovingAverageVector = exports.MovingAverage = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MovingAverage = exports.MovingAverage = function () {
  function MovingAverage(order) {
    (0, _classCallCheck3.default)(this, MovingAverage);

    this.order = order;
    this.index = 0;
    this.stack = new Array(this.order);

    for (var i = 0; i < this.order; i++) {
      this.stack[i] = 0;
    }
  }

  (0, _createClass3.default)(MovingAverage, [{
    key: "process",
    value: function process(value) {
      this.stack[this.index] = value;
      var sum = 0;

      for (var i = 0; i < this.order; i++) {
        sum += this.stack[i];
      }this.index = (this.index + 1) % this.order;
      console.log(value, this.stack);
      return sum / this.order;
    }
  }]);
  return MovingAverage;
}();

var MovingAverageVector = exports.MovingAverageVector = function () {
  function MovingAverageVector(vectorSize, order) {
    (0, _classCallCheck3.default)(this, MovingAverageVector);

    this.vectorSize = vectorSize;
    this.order = order;
    this.index = 0;

    this.stack = new Array(vectorSize);
    this.sums = new Array(vectorSize);

    for (var i = 0; i < vectorSize; i++) {
      this.stack[i] = new Array(this.order);
      this.sums[i] = 0;

      for (var j = 0; j < this.order; j++) {
        this.stack[i][j] = 0;
      }
    }
  }

  (0, _createClass3.default)(MovingAverageVector, [{
    key: "process",
    value: function process(arr) {
      for (var i = 0; i < this.vectorSize; i++) {
        this.stack[i][this.index] = arr[i];
        this.sums[i] = 0;

        for (var j = 0; j < this.order; j++) {
          this.sums[i] += this.stack[i][j];
        }this.sums[i] = this.sums[i] / this.order;
      }

      this.index = (this.index + 1) % this.order;
      return this.sums;
    }
  }]);
  return MovingAverageVector;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vdmluZ0F2ZXJhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDYSxhLFdBQUEsYTtBQUNYLHlCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFNBQUssS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLLEtBQUwsR0FBYSxJQUFJLEtBQUosQ0FBVSxLQUFLLEtBQWYsQ0FBYjs7QUFFQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxLQUF6QixFQUFnQyxHQUFoQztBQUNFLFdBQUssS0FBTCxDQUFXLENBQVgsSUFBZ0IsQ0FBaEI7QUFERjtBQUVEOzs7OzRCQUVPLEssRUFBTztBQUNiLFdBQUssS0FBTCxDQUFXLEtBQUssS0FBaEIsSUFBeUIsS0FBekI7QUFDQSxVQUFJLE1BQU0sQ0FBVjs7QUFFQSxXQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxLQUF6QixFQUFnQyxHQUFoQztBQUNFLGVBQU8sS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUFQO0FBREYsT0FHQSxLQUFLLEtBQUwsR0FBYSxDQUFDLEtBQUssS0FBTCxHQUFhLENBQWQsSUFBbUIsS0FBSyxLQUFyQztBQUNBLGNBQVEsR0FBUixDQUFZLEtBQVosRUFBbUIsS0FBSyxLQUF4QjtBQUNBLGFBQU8sTUFBTSxLQUFLLEtBQWxCO0FBQ0Q7Ozs7O0lBR1UsbUIsV0FBQSxtQjtBQUNYLCtCQUFZLFVBQVosRUFBd0IsS0FBeEIsRUFBK0I7QUFBQTs7QUFDN0IsU0FBSyxVQUFMLEdBQWtCLFVBQWxCO0FBQ0EsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFNBQUssS0FBTCxHQUFhLENBQWI7O0FBRUEsU0FBSyxLQUFMLEdBQWEsSUFBSSxLQUFKLENBQVUsVUFBVixDQUFiO0FBQ0EsU0FBSyxJQUFMLEdBQVksSUFBSSxLQUFKLENBQVUsVUFBVixDQUFaOztBQUVBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxVQUFwQixFQUFnQyxHQUFoQyxFQUFxQztBQUNuQyxXQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLElBQUksS0FBSixDQUFVLEtBQUssS0FBZixDQUFoQjtBQUNBLFdBQUssSUFBTCxDQUFVLENBQVYsSUFBZSxDQUFmOztBQUVBLFdBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLEtBQXpCLEVBQWdDLEdBQWhDO0FBQ0UsYUFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQsSUFBbUIsQ0FBbkI7QUFERjtBQUVEO0FBQ0Y7Ozs7NEJBRU8sRyxFQUFLO0FBQ1gsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssVUFBekIsRUFBcUMsR0FBckMsRUFBMEM7QUFDeEMsYUFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLEtBQUssS0FBbkIsSUFBNEIsSUFBSSxDQUFKLENBQTVCO0FBQ0EsYUFBSyxJQUFMLENBQVUsQ0FBVixJQUFlLENBQWY7O0FBRUEsYUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssS0FBekIsRUFBZ0MsR0FBaEM7QUFDRSxlQUFLLElBQUwsQ0FBVSxDQUFWLEtBQWdCLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxDQUFkLENBQWhCO0FBREYsU0FHQSxLQUFLLElBQUwsQ0FBVSxDQUFWLElBQWUsS0FBSyxJQUFMLENBQVUsQ0FBVixJQUFlLEtBQUssS0FBbkM7QUFDRDs7QUFFRCxXQUFLLEtBQUwsR0FBYSxDQUFDLEtBQUssS0FBTCxHQUFhLENBQWQsSUFBbUIsS0FBSyxLQUFyQztBQUNBLGFBQU8sS0FBSyxJQUFaO0FBQ0QiLCJmaWxlIjoiTW92aW5nQXZlcmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIE1vdmluZ0F2ZXJhZ2Uge1xuICBjb25zdHJ1Y3RvcihvcmRlcikge1xuICAgIHRoaXMub3JkZXIgPSBvcmRlcjtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLnN0YWNrID0gbmV3IEFycmF5KHRoaXMub3JkZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9yZGVyOyBpKyspXG4gICAgICB0aGlzLnN0YWNrW2ldID0gMDtcbiAgfVxuXG4gIHByb2Nlc3ModmFsdWUpIHtcbiAgICB0aGlzLnN0YWNrW3RoaXMuaW5kZXhdID0gdmFsdWU7XG4gICAgbGV0IHN1bSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3JkZXI7IGkrKylcbiAgICAgIHN1bSArPSB0aGlzLnN0YWNrW2ldO1xuXG4gICAgdGhpcy5pbmRleCA9ICh0aGlzLmluZGV4ICsgMSkgJSB0aGlzLm9yZGVyO1xuICAgIGNvbnNvbGUubG9nKHZhbHVlLCB0aGlzLnN0YWNrKTtcbiAgICByZXR1cm4gc3VtIC8gdGhpcy5vcmRlcjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW92aW5nQXZlcmFnZVZlY3RvciB7XG4gIGNvbnN0cnVjdG9yKHZlY3RvclNpemUsIG9yZGVyKSB7XG4gICAgdGhpcy52ZWN0b3JTaXplID0gdmVjdG9yU2l6ZTtcbiAgICB0aGlzLm9yZGVyID0gb3JkZXI7XG4gICAgdGhpcy5pbmRleCA9IDA7XG5cbiAgICB0aGlzLnN0YWNrID0gbmV3IEFycmF5KHZlY3RvclNpemUpO1xuICAgIHRoaXMuc3VtcyA9IG5ldyBBcnJheSh2ZWN0b3JTaXplKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVjdG9yU2l6ZTsgaSsrKSB7XG4gICAgICB0aGlzLnN0YWNrW2ldID0gbmV3IEFycmF5KHRoaXMub3JkZXIpO1xuICAgICAgdGhpcy5zdW1zW2ldID0gMDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm9yZGVyOyBqKyspXG4gICAgICAgIHRoaXMuc3RhY2tbaV1bal0gPSAwO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3MoYXJyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlY3RvclNpemU7IGkrKykge1xuICAgICAgdGhpcy5zdGFja1tpXVt0aGlzLmluZGV4XSA9IGFycltpXTtcbiAgICAgIHRoaXMuc3Vtc1tpXSA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5vcmRlcjsgaisrKVxuICAgICAgICB0aGlzLnN1bXNbaV0gKz0gdGhpcy5zdGFja1tpXVtqXTtcblxuICAgICAgdGhpcy5zdW1zW2ldID0gdGhpcy5zdW1zW2ldIC8gdGhpcy5vcmRlcjtcbiAgICB9XG5cbiAgICB0aGlzLmluZGV4ID0gKHRoaXMuaW5kZXggKyAxKSAlIHRoaXMub3JkZXI7XG4gICAgcmV0dXJuIHRoaXMuc3VtcztcbiAgfVxufVxuIl19