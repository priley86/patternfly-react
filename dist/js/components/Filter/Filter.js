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

var _recompose = require('recompose');

var _ToolbarConstants = require('../Toolbar/ToolbarConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Disabled eslint due to `isDescendantOfToolbar` being a context property we don't want passed by consumers
// eslint-disable-next-line react/prop-types
var Filter = function Filter(_ref) {
  var children = _ref.children,
      className = _ref.className,
      isDescendantOfToolbar = _ref.isDescendantOfToolbar,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'isDescendantOfToolbar']);

  var classes = (0, _classnames2.default)({
    'filter-pf form-group': true,
    'toolbar-pf-filter': isDescendantOfToolbar
  }, className);

  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, rest),
    _react2.default.createElement(
      'div',
      { className: 'filter-pf-fields' },
      _react2.default.createElement(
        'div',
        { className: 'input-group' },
        children
      )
    )
  );
};

Filter.propTypes = {
  /** Children nodes */
  children: _propTypes2.default.node,
  /** Additional css classes */
  className: _propTypes2.default.string
};

Filter.defaultProps = {
  children: null,
  className: ''
};
exports.default = (0, _recompose.getContext)(_ToolbarConstants.toolbarContextTypes)(Filter);