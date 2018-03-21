'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _ButtonConstants = require('./ButtonConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownButton = function DropdownButton(props) {
  return _react2.default.createElement(_reactBootstrap.DropdownButton, props);
};

DropdownButton.propTypes = _extends({}, _reactBootstrap.DropdownButton.propTypes, {
  // eslint-disable-next-line react/require-default-props
  bsStyle: _propTypes2.default.oneOf(_ButtonConstants.BUTTON_BS_STYLES)
});

DropdownButton.BUTTON_BS_STYLES = _ButtonConstants.BUTTON_BS_STYLES;

exports.default = DropdownButton;