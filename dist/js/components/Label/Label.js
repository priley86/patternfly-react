'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _DisposableLabel = require('./DisposableLabel');

var _DisposableLabel2 = _interopRequireDefault(_DisposableLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Label = function Label(props) {
  if (props.onRemoveClick) {
    return _react2.default.createElement(_DisposableLabel2.default, props);
  }
  return _react2.default.createElement(_reactBootstrap.Label, props);
};

Label.propTypes = _extends({}, _reactBootstrap.Label.propTypes, _DisposableLabel2.default.propTypes);

exports.default = Label;