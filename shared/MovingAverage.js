"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MovingAverage = function () {
  function MovingAverage(order) {
    (0, _classCallCheck3.default)(this, MovingAverage);

    this.order = order;
    this.stack = new Array(this.order);
    this.currentIndex = 0;
  }

  (0, _createClass3.default)(MovingAverage, [{
    key: "process",
    value: function process(value) {
      this.stack[this.index] = value;
      var sum = 0;

      for (var i = 0; i < this.order; i++) {
        sum += this.stack[i];
      }this.index = (this.index + 1) % this.order;
      return sum;
    }
  }]);
  return MovingAverage;
}();

exports.default = MovingAverage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vdmluZ0F2ZXJhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUNxQixhO0FBQ25CLHlCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFNBQUssS0FBTCxHQUFhLElBQUksS0FBSixDQUFVLEtBQUssS0FBZixDQUFiO0FBQ0EsU0FBSyxZQUFMLEdBQW9CLENBQXBCO0FBQ0Q7Ozs7NEJBRU8sSyxFQUFPO0FBQ2IsV0FBSyxLQUFMLENBQVcsS0FBSyxLQUFoQixJQUF5QixLQUF6QjtBQUNBLFVBQUksTUFBTSxDQUFWOztBQUVBLFdBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLEtBQXpCLEVBQWdDLEdBQWhDO0FBQ0UsZUFBTyxLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQVA7QUFERixPQUdBLEtBQUssS0FBTCxHQUFhLENBQUMsS0FBSyxLQUFMLEdBQWEsQ0FBZCxJQUFtQixLQUFLLEtBQXJDO0FBQ0EsYUFBTyxHQUFQO0FBQ0Q7Ozs7O2tCQWhCa0IsYSIsImZpbGUiOiJNb3ZpbmdBdmVyYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdBdmVyYWdlIHtcbiAgY29uc3RydWN0b3Iob3JkZXIpIHtcbiAgICB0aGlzLm9yZGVyID0gb3JkZXI7XG4gICAgdGhpcy5zdGFjayA9IG5ldyBBcnJheSh0aGlzLm9yZGVyKTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gIH1cblxuICBwcm9jZXNzKHZhbHVlKSB7XG4gICAgdGhpcy5zdGFja1t0aGlzLmluZGV4XSA9IHZhbHVlO1xuICAgIGxldCBzdW0gPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9yZGVyOyBpKyspXG4gICAgICBzdW0gKz0gdGhpcy5zdGFja1tpXTtcblxuICAgIHRoaXMuaW5kZXggPSAodGhpcy5pbmRleCArIDEpICUgdGhpcy5vcmRlcjtcbiAgICByZXR1cm4gc3VtO1xuICB9XG59XG4iXX0=