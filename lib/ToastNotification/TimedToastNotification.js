'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require('../common/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _Timer = require('../common/Timer');

var _Timer2 = _interopRequireDefault(_Timer);

var _constants = require('../common/constants');

var _index = require('../index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TimedToastNotification Component for Patternfly React
 */
var TimedToastNotification = function (_React$Component) {
  _inherits(TimedToastNotification, _React$Component);

  function TimedToastNotification(props) {
    _classCallCheck(this, TimedToastNotification);

    var _this = _possibleConstructorReturn(this, (TimedToastNotification.__proto__ || Object.getPrototypeOf(TimedToastNotification)).call(this, props));

    _helpers2.default.bindMethods(_this, ['onMouseEnter', 'onMouseLeave']);
    return _this;
  }

  _createClass(TimedToastNotification, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          paused = _props.paused,
          persistent = _props.persistent,
          onDismiss = _props.onDismiss,
          timerdelay = _props.timerdelay;


      if (!persistent) {
        this.timer = new _Timer2.default(onDismiss, timerdelay);
        this.timer.startTimer();
      }

      /** if we are paused on mount, then clear the timer
       * after having initialized with the correct delay */
      if (paused) {
        this.timer && this.timer.clearTimer();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      /**
       * If paused prop changes, update our timer
       */
      if (nextProps.paused !== this.props.paused) {
        if (nextProps.paused) {
          this.timer && this.timer.clearTimer();
        } else {
          this.timer && this.timer.startTimer();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.timer && this.timer.clearTimer();
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter() {
      var onMouseEnter = this.props.onMouseEnter;

      onMouseEnter && onMouseEnter();
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      var onMouseLeave = this.props.onMouseLeave;

      onMouseLeave && onMouseLeave();
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return _react2.default.createElement(
        _index.ToastNotification,
        _extends({}, this.props, {
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave
        }),
        children
      );
    }
  }]);

  return TimedToastNotification;
}(_react2.default.Component);

TimedToastNotification.propTypes = {
  /** pauses notification from dismissing */
  paused: _propTypes2.default.bool,
  /** persistent keeps the notification up endlessly until closed */
  persistent: _propTypes2.default.bool,
  /** timer delay until dismiss */
  timerdelay: _propTypes2.default.number,
  /** additional notification classes */
  className: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  /** callback when alert is dismissed  */
  onDismiss: _propTypes2.default.func,
  /** onMouseEnter callback */
  onMouseEnter: _propTypes2.default.func,
  /** onMouseLeave callback */
  onMouseLeave: _propTypes2.default.func,
  /** the type of alert  */
  type: _propTypes2.default.oneOf(_constants.TOAST_NOTIFICATION_TYPES).isRequired, // eslint-disable-line react/no-unused-prop-types
  /** children nodes  */
  children: _propTypes2.default.node
};
TimedToastNotification.defaultProps = {
  paused: false,
  type: 'error',
  timerdelay: 8000
};

exports.default = TimedToastNotification;