'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../index');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tabs Component for Patternfly React
 */
var Tabs = function Tabs(props) {
  var contents = props.children.map(function (child) {
    return child.type === _index.TabRowContents;
  });
  var tabsClass = (0, _classnames2.default)(props.className, {
    'nav-justified': props.justified,
    'nav-tabs-pf': props.pfStyle,
    'pf-tabrow': contents.indexOf(true) >= 0
  });
  return _react2.default.createElement(
    _index.Nav,
    {
      onSelect: props.onSelect,
      activeKey: props.activeKey,
      bsClass: tabsClass,
      role: 'tablist'
    },
    props.children
  );
};

Tabs.propTypes = {
  /** tab selected callback */
  onSelect: _propTypes2.default.func,
  /** nav tabs class */
  className: _propTypes2.default.string,
  /** sets the active tab key */
  activeKey: _propTypes2.default.number,
  /** children nodes  */
  children: _propTypes2.default.node,
  /** apply nav-justified class */
  justified: _propTypes2.default.bool,
  /** apply nav-tabs-pf class */
  pfStyle: _propTypes2.default.bool
};
Tabs.defaultProps = {
  className: 'nav nav-tabs'
};

exports.default = Tabs;