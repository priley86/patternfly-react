'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../index');

var _constants = require('../common/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * ToastNotification Component for Patternfly React
 */
var ToastNotification = function ToastNotification(_ref) {
  var className = _ref.className,
      onDismiss = _ref.onDismiss,
      type = _ref.type,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ['className', 'onDismiss', 'type', 'children']);

  var notificationClasses = (0, _classnames2.default)({
    alert: true,
    'toast-pf': true,
    'alert-danger': type === 'danger' || type === 'error',
    'alert-warning': type === 'warning',
    'alert-success': type === 'success',
    'alert-info': type === 'info',
    'alert-dismissable': onDismiss
  }, className);
  var iconClass = (0, _classnames2.default)({
    pficon: true,
    'pficon-error-circle-o': type === 'danger' || type === 'error',
    'pficon-warning-triangle-o': type === 'warning',
    'pficon-ok': type === 'success',
    'pficon-info': type === 'info'
  });

  return _react2.default.createElement(
    'div',
    _extends({ className: notificationClasses }, props),
    onDismiss && _react2.default.createElement(
      _index.Button,
      { bsClass: 'close', 'aria-hidden': 'true', onClick: onDismiss },
      _react2.default.createElement('span', { className: 'pficon pficon-close' })
    ),
    _react2.default.createElement('span', { className: iconClass }),
    children
  );
};
ToastNotification.propTypes = {
  /** additional notification classes */
  className: _propTypes2.default.string,
  /** callback when alert is dismissed  */
  onDismiss: _propTypes2.default.func,
  /** the type of alert  */
  type: _propTypes2.default.oneOf(_constants.TOAST_NOTIFICATION_TYPES).isRequired,
  /** children nodes  */
  children: _propTypes2.default.node
};
ToastNotification.defaultProps = {
  type: 'error'
};

exports.default = ToastNotification;