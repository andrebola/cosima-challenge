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
  function MovingAverage() {
    var order = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
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
      return sum / this.order;
    }
  }]);
  return MovingAverage;
}();

var MovingAverageVector = exports.MovingAverageVector = function () {
  function MovingAverageVector(vectorSize) {
    var order = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDYSxhLFdBQUEsYTtBQUNYLDJCQUF1QjtBQUFBLFFBQVgsS0FBVyx5REFBSCxDQUFHO0FBQUE7O0FBQ3JCLFNBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxTQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBSyxLQUFMLEdBQWEsSUFBSSxLQUFKLENBQVUsS0FBSyxLQUFmLENBQWI7O0FBRUEsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssS0FBekIsRUFBZ0MsR0FBaEM7QUFDRSxXQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLENBQWhCO0FBREY7QUFFRDs7Ozs0QkFFTyxLLEVBQU87QUFDYixXQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQWhCLElBQXlCLEtBQXpCO0FBQ0EsVUFBSSxNQUFNLENBQVY7O0FBRUEsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssS0FBekIsRUFBZ0MsR0FBaEM7QUFDRSxlQUFPLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBUDtBQURGLE9BR0EsS0FBSyxLQUFMLEdBQWEsQ0FBQyxLQUFLLEtBQUwsR0FBYSxDQUFkLElBQW1CLEtBQUssS0FBckM7QUFDQSxhQUFPLE1BQU0sS0FBSyxLQUFsQjtBQUNEOzs7OztJQUdVLG1CLFdBQUEsbUI7QUFDWCwrQkFBWSxVQUFaLEVBQW1DO0FBQUEsUUFBWCxLQUFXLHlEQUFILENBQUc7QUFBQTs7QUFDakMsU0FBSyxVQUFMLEdBQWtCLFVBQWxCO0FBQ0EsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFNBQUssS0FBTCxHQUFhLENBQWI7O0FBRUEsU0FBSyxLQUFMLEdBQWEsSUFBSSxLQUFKLENBQVUsVUFBVixDQUFiO0FBQ0EsU0FBSyxJQUFMLEdBQVksSUFBSSxLQUFKLENBQVUsVUFBVixDQUFaOztBQUVBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxVQUFwQixFQUFnQyxHQUFoQyxFQUFxQztBQUNuQyxXQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLElBQUksS0FBSixDQUFVLEtBQUssS0FBZixDQUFoQjtBQUNBLFdBQUssSUFBTCxDQUFVLENBQVYsSUFBZSxDQUFmOztBQUVBLFdBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLEtBQXpCLEVBQWdDLEdBQWhDO0FBQ0UsYUFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQsSUFBbUIsQ0FBbkI7QUFERjtBQUVEO0FBQ0Y7Ozs7NEJBRU8sRyxFQUFLO0FBQ1gsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssVUFBekIsRUFBcUMsR0FBckMsRUFBMEM7QUFDeEMsYUFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLEtBQUssS0FBbkIsSUFBNEIsSUFBSSxDQUFKLENBQTVCO0FBQ0EsYUFBSyxJQUFMLENBQVUsQ0FBVixJQUFlLENBQWY7O0FBRUEsYUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssS0FBekIsRUFBZ0MsR0FBaEM7QUFDRSxlQUFLLElBQUwsQ0FBVSxDQUFWLEtBQWdCLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxDQUFkLENBQWhCO0FBREYsU0FHQSxLQUFLLElBQUwsQ0FBVSxDQUFWLElBQWUsS0FBSyxJQUFMLENBQVUsQ0FBVixJQUFlLEtBQUssS0FBbkM7QUFDRDs7QUFFRCxXQUFLLEtBQUwsR0FBYSxDQUFDLEtBQUssS0FBTCxHQUFhLENBQWQsSUFBbUIsS0FBSyxLQUFyQztBQUNBLGFBQU8sS0FBSyxJQUFaO0FBQ0QiLCJmaWxlIjoiUGxheWVyRXhwZXJpZW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIE1vdmluZ0F2ZXJhZ2Uge1xuICBjb25zdHJ1Y3RvcihvcmRlciA9IDEpIHtcbiAgICB0aGlzLm9yZGVyID0gb3JkZXI7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgdGhpcy5zdGFjayA9IG5ldyBBcnJheSh0aGlzLm9yZGVyKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcmRlcjsgaSsrKVxuICAgICAgdGhpcy5zdGFja1tpXSA9IDA7XG4gIH1cblxuICBwcm9jZXNzKHZhbHVlKSB7XG4gICAgdGhpcy5zdGFja1t0aGlzLmluZGV4XSA9IHZhbHVlO1xuICAgIGxldCBzdW0gPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9yZGVyOyBpKyspXG4gICAgICBzdW0gKz0gdGhpcy5zdGFja1tpXTtcblxuICAgIHRoaXMuaW5kZXggPSAodGhpcy5pbmRleCArIDEpICUgdGhpcy5vcmRlcjtcbiAgICByZXR1cm4gc3VtIC8gdGhpcy5vcmRlcjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW92aW5nQXZlcmFnZVZlY3RvciB7XG4gIGNvbnN0cnVjdG9yKHZlY3RvclNpemUsIG9yZGVyID0gMSkge1xuICAgIHRoaXMudmVjdG9yU2l6ZSA9IHZlY3RvclNpemU7XG4gICAgdGhpcy5vcmRlciA9IG9yZGVyO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuXG4gICAgdGhpcy5zdGFjayA9IG5ldyBBcnJheSh2ZWN0b3JTaXplKTtcbiAgICB0aGlzLnN1bXMgPSBuZXcgQXJyYXkodmVjdG9yU2l6ZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlY3RvclNpemU7IGkrKykge1xuICAgICAgdGhpcy5zdGFja1tpXSA9IG5ldyBBcnJheSh0aGlzLm9yZGVyKTtcbiAgICAgIHRoaXMuc3Vtc1tpXSA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5vcmRlcjsgaisrKVxuICAgICAgICB0aGlzLnN0YWNrW2ldW2pdID0gMDtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzKGFycikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52ZWN0b3JTaXplOyBpKyspIHtcbiAgICAgIHRoaXMuc3RhY2tbaV1bdGhpcy5pbmRleF0gPSBhcnJbaV07XG4gICAgICB0aGlzLnN1bXNbaV0gPSAwO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMub3JkZXI7IGorKylcbiAgICAgICAgdGhpcy5zdW1zW2ldICs9IHRoaXMuc3RhY2tbaV1bal07XG5cbiAgICAgIHRoaXMuc3Vtc1tpXSA9IHRoaXMuc3Vtc1tpXSAvIHRoaXMub3JkZXI7XG4gICAgfVxuXG4gICAgdGhpcy5pbmRleCA9ICh0aGlzLmluZGV4ICsgMSkgJSB0aGlzLm9yZGVyO1xuICAgIHJldHVybiB0aGlzLnN1bXM7XG4gIH1cbn1cbiJdfQ==