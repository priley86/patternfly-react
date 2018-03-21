'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _index = require('../../index');

var _ToolbarConstants = require('./ToolbarConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Toolbar = function Toolbar(_ref) {
  var children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['children', 'className']);

  var childrenArray = children && _react2.default.Children.count(children) > 0 && _react2.default.Children.toArray(children);

  var toolbarChildren = childrenArray && childrenArray.filter(function (child) {
    return child.type !== _index.ToolbarResults;
  });
  var resultsChildren = childrenArray && childrenArray.filter(function (child) {
    return child.type === _index.ToolbarResults;
  });

  return _react2.default.createElement(
    _ToolbarConstants.ToolbarContextProvider,
    { isDescendantOfToolbar: true },
    _react2.default.createElement(
      _index.Grid,
      { fluid: true, className: className },
      _react2.default.createElement(
        _index.Grid.Row,
        { className: 'toolbar-pf' },
        _react2.default.createElement(
          _index.Grid.Col,
          { sm: 12 },
          _react2.default.createElement(
            'form',
            { className: 'toolbar-pf-actions' },
            toolbarChildren
          ),
          resultsChildren
        )
      )
    )
  );
};

Toolbar.propTypes = {
  /** Children nodes */
  children: _propTypes2.default.node,
  /** Additional css classes */
  className: _propTypes2.default.string
};

Toolbar.defaultProps = {
  children: null,
  className: ''
};

exports.default = (0, _recompose.withContext)(_ToolbarConstants.toolbarContextTypes, _ToolbarConstants.getToolbarContext)(Toolbar);