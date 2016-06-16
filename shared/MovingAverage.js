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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbG9yT3BhY2l0eUxvZ2ljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ2EsYSxXQUFBLGE7QUFDWCwyQkFBdUI7QUFBQSxRQUFYLEtBQVcseURBQUgsQ0FBRztBQUFBOztBQUNyQixTQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsU0FBSyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUssS0FBTCxHQUFhLElBQUksS0FBSixDQUFVLEtBQUssS0FBZixDQUFiOztBQUVBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLEtBQXpCLEVBQWdDLEdBQWhDO0FBQ0UsV0FBSyxLQUFMLENBQVcsQ0FBWCxJQUFnQixDQUFoQjtBQURGO0FBRUQ7Ozs7NEJBRU8sSyxFQUFPO0FBQ2IsV0FBSyxLQUFMLENBQVcsS0FBSyxLQUFoQixJQUF5QixLQUF6QjtBQUNBLFVBQUksTUFBTSxDQUFWOztBQUVBLFdBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLEtBQXpCLEVBQWdDLEdBQWhDO0FBQ0UsZUFBTyxLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQVA7QUFERixPQUdBLEtBQUssS0FBTCxHQUFhLENBQUMsS0FBSyxLQUFMLEdBQWEsQ0FBZCxJQUFtQixLQUFLLEtBQXJDO0FBQ0EsYUFBTyxNQUFNLEtBQUssS0FBbEI7QUFDRDs7Ozs7SUFHVSxtQixXQUFBLG1CO0FBQ1gsK0JBQVksVUFBWixFQUFtQztBQUFBLFFBQVgsS0FBVyx5REFBSCxDQUFHO0FBQUE7O0FBQ2pDLFNBQUssVUFBTCxHQUFrQixVQUFsQjtBQUNBLFNBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxTQUFLLEtBQUwsR0FBYSxDQUFiOztBQUVBLFNBQUssS0FBTCxHQUFhLElBQUksS0FBSixDQUFVLFVBQVYsQ0FBYjtBQUNBLFNBQUssSUFBTCxHQUFZLElBQUksS0FBSixDQUFVLFVBQVYsQ0FBWjs7QUFFQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksVUFBcEIsRUFBZ0MsR0FBaEMsRUFBcUM7QUFDbkMsV0FBSyxLQUFMLENBQVcsQ0FBWCxJQUFnQixJQUFJLEtBQUosQ0FBVSxLQUFLLEtBQWYsQ0FBaEI7QUFDQSxXQUFLLElBQUwsQ0FBVSxDQUFWLElBQWUsQ0FBZjs7QUFFQSxXQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxLQUF6QixFQUFnQyxHQUFoQztBQUNFLGFBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxDQUFkLElBQW1CLENBQW5CO0FBREY7QUFFRDtBQUNGOzs7OzRCQUVPLEcsRUFBSztBQUNYLFdBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLFVBQXpCLEVBQXFDLEdBQXJDLEVBQTBDO0FBQ3hDLGFBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxLQUFLLEtBQW5CLElBQTRCLElBQUksQ0FBSixDQUE1QjtBQUNBLGFBQUssSUFBTCxDQUFVLENBQVYsSUFBZSxDQUFmOztBQUVBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLEtBQXpCLEVBQWdDLEdBQWhDO0FBQ0UsZUFBSyxJQUFMLENBQVUsQ0FBVixLQUFnQixLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsQ0FBZCxDQUFoQjtBQURGLFNBR0EsS0FBSyxJQUFMLENBQVUsQ0FBVixJQUFlLEtBQUssSUFBTCxDQUFVLENBQVYsSUFBZSxLQUFLLEtBQW5DO0FBQ0Q7O0FBRUQsV0FBSyxLQUFMLEdBQWEsQ0FBQyxLQUFLLEtBQUwsR0FBYSxDQUFkLElBQW1CLEtBQUssS0FBckM7QUFDQSxhQUFPLEtBQUssSUFBWjtBQUNEIiwiZmlsZSI6ImNvbG9yT3BhY2l0eUxvZ2ljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY2xhc3MgTW92aW5nQXZlcmFnZSB7XG4gIGNvbnN0cnVjdG9yKG9yZGVyID0gMSkge1xuICAgIHRoaXMub3JkZXIgPSBvcmRlcjtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLnN0YWNrID0gbmV3IEFycmF5KHRoaXMub3JkZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9yZGVyOyBpKyspXG4gICAgICB0aGlzLnN0YWNrW2ldID0gMDtcbiAgfVxuXG4gIHByb2Nlc3ModmFsdWUpIHtcbiAgICB0aGlzLnN0YWNrW3RoaXMuaW5kZXhdID0gdmFsdWU7XG4gICAgbGV0IHN1bSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3JkZXI7IGkrKylcbiAgICAgIHN1bSArPSB0aGlzLnN0YWNrW2ldO1xuXG4gICAgdGhpcy5pbmRleCA9ICh0aGlzLmluZGV4ICsgMSkgJSB0aGlzLm9yZGVyO1xuICAgIHJldHVybiBzdW0gLyB0aGlzLm9yZGVyO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb3ZpbmdBdmVyYWdlVmVjdG9yIHtcbiAgY29uc3RydWN0b3IodmVjdG9yU2l6ZSwgb3JkZXIgPSAxKSB7XG4gICAgdGhpcy52ZWN0b3JTaXplID0gdmVjdG9yU2l6ZTtcbiAgICB0aGlzLm9yZGVyID0gb3JkZXI7XG4gICAgdGhpcy5pbmRleCA9IDA7XG5cbiAgICB0aGlzLnN0YWNrID0gbmV3IEFycmF5KHZlY3RvclNpemUpO1xuICAgIHRoaXMuc3VtcyA9IG5ldyBBcnJheSh2ZWN0b3JTaXplKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVjdG9yU2l6ZTsgaSsrKSB7XG4gICAgICB0aGlzLnN0YWNrW2ldID0gbmV3IEFycmF5KHRoaXMub3JkZXIpO1xuICAgICAgdGhpcy5zdW1zW2ldID0gMDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm9yZGVyOyBqKyspXG4gICAgICAgIHRoaXMuc3RhY2tbaV1bal0gPSAwO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3MoYXJyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlY3RvclNpemU7IGkrKykge1xuICAgICAgdGhpcy5zdGFja1tpXVt0aGlzLmluZGV4XSA9IGFycltpXTtcbiAgICAgIHRoaXMuc3Vtc1tpXSA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5vcmRlcjsgaisrKVxuICAgICAgICB0aGlzLnN1bXNbaV0gKz0gdGhpcy5zdGFja1tpXVtqXTtcblxuICAgICAgdGhpcy5zdW1zW2ldID0gdGhpcy5zdW1zW2ldIC8gdGhpcy5vcmRlcjtcbiAgICB9XG5cbiAgICB0aGlzLmluZGV4ID0gKHRoaXMuaW5kZXggKyAxKSAlIHRoaXMub3JkZXI7XG4gICAgcmV0dXJuIHRoaXMuc3VtcztcbiAgfVxufVxuIl19