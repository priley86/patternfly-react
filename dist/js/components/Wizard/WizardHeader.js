'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * WizardHeader component for Patternfly React
 */
var WizardHeader = function WizardHeader(_ref) {
  var onClose = _ref.onClose,
      title = _ref.title,
      props = _objectWithoutProperties(_ref, ['onClose', 'title']);

  return _react2.default.createElement(
    _index.Modal.Header,
    props,
    _react2.default.createElement(
      'button',
      {
        className: 'close',
        onClick: onClose,
        'aria-hidden': 'true',
        'aria-label': 'Close'
      },
      _react2.default.createElement(_index.Icon, { type: 'pf', name: 'close' })
    ),
    _react2.default.createElement(
      _index.Modal.Title,
      null,
      title
    )
  );
};
WizardHeader.propTypes = {
  /** onClose callback */
  onClose: _propTypes2.default.func,
  /** The wizard title */
  title: _propTypes2.default.node
};
WizardHeader.defaultProps = {
  onClose: _index.noop,
  title: null
};
exports.default = WizardHeader;