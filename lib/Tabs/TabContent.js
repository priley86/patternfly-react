'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TabContent Component for Patternfly React
 */
var TabContent = function TabContent(props) {
  var active = props.activeKey === props.eventKey;
  var tabContentClass = (0, _classnames2.default)({
    hidden: !active,
    active: active
  }, props.className);
  return _react2.default.createElement(
    'div',
    _extends({ role: 'tabpanel', className: tabContentClass }, props),
    props.children
  );
};
TabContent.propTypes = {
  /** the active tab key */
  activeKey: _propTypes2.default.string,
  /** the event key for this content */
  eventKey: _propTypes2.default.string,
  /** tab content class */
  className: _propTypes2.default.string,
  /** children nodes  */
  children: _propTypes2.default.node
};
TabContent.defaultProps = {
  eventKey: '-1' // hide by default
};

exports.default = TabContent;