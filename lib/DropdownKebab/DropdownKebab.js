'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * DropdownKebab Component for Patternfly React
 */
var DropdownKebab = function DropdownKebab(_ref) {
  var className = _ref.className,
      children = _ref.children,
      id = _ref.id,
      pullRight = _ref.pullRight;

  var kebabClass = (0, _classnames2.default)('dropdown-kebab-pf', className);
  return _react2.default.createElement(
    _index.Dropdown,
    { className: kebabClass, id: id, pullRight: pullRight },
    _react2.default.createElement(
      _index.Dropdown.Toggle,
      { bsStyle: 'link', noCaret: true },
      _react2.default.createElement(_index.Icon, { name: 'ellipsis-v' })
    ),
    _react2.default.createElement(
      _index.Dropdown.Menu,
      null,
      children
    )
  );
};
DropdownKebab.propTypes = {
  /** additional kebab dropdown classes */
  className: _propTypes2.default.string,
  /** children nodes  */
  children: _propTypes2.default.node,
  /** kebab dropdown id */
  id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  /** menu right aligned */
  pullRight: _propTypes2.default.bool
};
exports.default = DropdownKebab;