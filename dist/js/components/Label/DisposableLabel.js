'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _RemoveButton = require('./RemoveButton');

var _RemoveButton2 = _interopRequireDefault(_RemoveButton);

var _helpers = require('../../common/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Country page Component
 */
var DisposableLabel = function DisposableLabel(_ref) {
  var children = _ref.children,
      type = _ref.type,
      onRemoveClick = _ref.onRemoveClick,
      rest = _objectWithoutProperties(_ref, ['children', 'type', 'onRemoveClick']);

  return _react2.default.createElement(
    _Label2.default,
    _extends({ bsStyle: type }, rest),
    children,
    _react2.default.createElement(_RemoveButton2.default, { onRemoveClick: onRemoveClick, title: 'Remove' })
  );
};

DisposableLabel.propTypes = {
  /** Children nodes */
  children: _propTypes2.default.node,
  /** Label type */
  type: _propTypes2.default.string,
  /** callback when Label is removed  */
  onRemoveClick: _propTypes2.default.func
};

DisposableLabel.defaultProps = {
  children: null,
  type: 'default',
  onRemoveClick: _helpers.noop
};
/** sdd */
exports.default = DisposableLabel;