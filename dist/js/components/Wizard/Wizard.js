'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Wizard - main Wizard component.
 */
var Wizard = function Wizard(_ref) {
  var children = _ref.children,
      className = _ref.className,
      dialogClassName = _ref.dialogClassName,
      show = _ref.show,
      onClose = _ref.onClose,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'dialogClassName', 'show', 'onClose']);

  return _react2.default.createElement(
    _index.Modal,
    _extends({
      show: show,
      onHide: onClose,
      dialogClassName: dialogClassName || 'modal-lg wizard-pf'
    }, rest),
    _react2.default.createElement(
      'div',
      { className: className },
      children
    )
  );
};
Wizard.propTypes = {
  /** Children nodes */
  children: _propTypes2.default.node,
  /** Additional css classes */
  className: _propTypes2.default.string,
  /** Wizard dialog class */
  dialogClassName: _propTypes2.default.string,
  /** show modal */
  show: _propTypes2.default.bool,
  /** on close callback */
  onClose: _propTypes2.default.func
};
Wizard.defaultProps = {
  children: null,
  className: '',
  dialogClassName: '',
  show: false,
  onClose: _index.noop
};
exports.default = Wizard;