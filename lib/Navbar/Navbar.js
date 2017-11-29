'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavbarCollapse = exports.NavbarToggle = exports.NavbarBrand = exports.NavbarHeader = exports.Navbar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Navbar Component for Patternfly React
 */
var Navbar = exports.Navbar = function Navbar(props) {
  return _react2.default.createElement(
    'nav',
    _extends({}, props, { role: 'navigation' }),
    props.children
  );
};
Navbar.propTypes = {
  /** children nodes  */
  children: _propTypes2.default.node

  /**
   * NavbarHeader Component for Patternfly React
   */
};var NavbarHeader = exports.NavbarHeader = function NavbarHeader(props) {
  return _react2.default.createElement(
    'div',
    { className: 'navbar-header' },
    props.children
  );
};
NavbarHeader.propTypes = {
  /** children nodes  */
  children: _propTypes2.default.node

  /**
   * NavbarBrand Component for Patternfly React
   */
};var NavbarBrand = exports.NavbarBrand = function NavbarBrand(props) {
  return _react2.default.createElement(
    'a',
    { href: '/', className: 'navbar-brand' },
    props.children
  );
};
NavbarBrand.propTypes = {
  /** children nodes  */
  children: _propTypes2.default.node

  /**
   * NavbarToggle Component for Patternfly React
   */
};var NavbarToggle = exports.NavbarToggle = function NavbarToggle() {
  return _react2.default.createElement(
    'button',
    { className: 'navbar-toggle' },
    _react2.default.createElement(
      'span',
      { className: 'sr-only' },
      'Toggle navigation'
    ),
    _react2.default.createElement('span', { className: 'icon-bar' }),
    _react2.default.createElement('span', { className: 'icon-bar' }),
    _react2.default.createElement('span', { className: 'icon-bar' })
  );
};

/**
 * NavbarCollapse Component for Patternfly React
 */
var NavbarCollapse = exports.NavbarCollapse = function NavbarCollapse(props) {
  return _react2.default.createElement(
    'div',
    { className: 'collapse navbar-collapse' },
    props.children
  );
};
NavbarCollapse.propTypes = {
  /** children nodes  */
  children: _propTypes2.default.node
};