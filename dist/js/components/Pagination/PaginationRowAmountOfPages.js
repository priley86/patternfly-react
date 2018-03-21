'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * PaginationRowAmountOfPages component for Patternfly React
 */
var PaginationRowAmountOfPages = function PaginationRowAmountOfPages(_ref) {
  var messagesOf = _ref.messagesOf,
      amountOfPages = _ref.amountOfPages,
      props = _objectWithoutProperties(_ref, ['messagesOf', 'amountOfPages']);

  return _react2.default.createElement(
    'span',
    props,
    '\xA0',
    messagesOf,
    '\xA0',
    _react2.default.createElement(
      'span',
      { className: 'pagination-pf-pages' },
      amountOfPages
    )
  );
};
PaginationRowAmountOfPages.propTypes = {
  /** messages of */
  messagesOf: _propTypes2.default.string.isRequired,
  /** calculated amount of pages */
  amountOfPages: _propTypes2.default.number.isRequired
};
exports.default = PaginationRowAmountOfPages;