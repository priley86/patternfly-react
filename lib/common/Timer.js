"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Timer class implements a simple timeout mechanism
 */
var Timer = function () {
  function Timer(func, delay) {
    _classCallCheck(this, Timer);

    this.timer = null;
    this.delay = delay;
    this.execute = func;
  }

  _createClass(Timer, [{
    key: "startTimer",
    value: function startTimer() {
      this.clearTimer();

      this.timer = setTimeout(this.execute, this.delay);
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }
  }]);

  return Timer;
}();

exports.default = Timer;