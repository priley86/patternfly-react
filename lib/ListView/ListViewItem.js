'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ListViewExpand = require('./ListViewExpand');

var _ListViewExpand2 = _interopRequireDefault(_ListViewExpand);

var _ListViewGroupItem = require('./ListViewGroupItem');

var _ListViewGroupItem2 = _interopRequireDefault(_ListViewGroupItem);

var _ListViewGroupItemContainer = require('./ListViewGroupItemContainer');

var _ListViewGroupItemContainer2 = _interopRequireDefault(_ListViewGroupItemContainer);

var _ListViewGroupItemHeader = require('./ListViewGroupItemHeader');

var _ListViewGroupItemHeader2 = _interopRequireDefault(_ListViewGroupItemHeader);

var _ListViewRow = require('./ListViewRow');

var _ListViewRow2 = _interopRequireDefault(_ListViewRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ListViewItem - main ListViewItem component which handles the expansion logic.
 * ListViewItem is considered expandable if it has child props. In that case it
 * renders ListViewGroupItemHeader and ListViewGroupItemContainer
 */
var ListViewItem = function (_React$Component) {
  _inherits(ListViewItem, _React$Component);

  function ListViewItem() {
    _classCallCheck(this, ListViewItem);

    var _this = _possibleConstructorReturn(this, (ListViewItem.__proto__ || Object.getPrototypeOf(ListViewItem)).call(this));

    _this.state = { expanded: false };
    return _this;
  }

  _createClass(ListViewItem, [{
    key: 'toggleExpanded',
    value: function toggleExpanded(index) {
      var _props = this.props,
          onExpand = _props.onExpand,
          onExpandClose = _props.onExpandClose;

      if (this.state.expanded) {
        onExpandClose && onExpandClose();
      } else {
        onExpand && onExpand();
      }
      this.setState(function (prevState) {
        return { expanded: !prevState.expanded };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          children = _props2.children,
          stacked = _props2.stacked,
          actions = _props2.actions,
          additionalInfo = _props2.additionalInfo,
          description = _props2.description,
          heading = _props2.heading,
          leftContent = _props2.leftContent,
          checkboxInput = _props2.checkboxInput,
          other = _objectWithoutProperties(_props2, ['children', 'stacked', 'actions', 'additionalInfo', 'description', 'heading', 'leftContent', 'checkboxInput']);

      var expanded = this.state.expanded;


      if (children) {
        return _react2.default.createElement(
          _ListViewGroupItem2.default,
          _extends({ expanded: expanded, stacked: stacked }, other),
          _react2.default.createElement(
            _ListViewGroupItemHeader2.default,
            { toggleExpanded: function toggleExpanded() {
                return _this2.toggleExpanded();
              } },
            _react2.default.createElement(_ListViewExpand2.default, {
              expanded: expanded,
              toggleExpanded: function toggleExpanded() {
                return _this2.toggleExpanded();
              }
            }),
            _react2.default.createElement(_ListViewRow2.default, {
              checkboxInput: checkboxInput,
              leftContent: leftContent,
              heading: heading,
              description: description,
              additionalInfo: additionalInfo,
              actions: actions
            })
          ),
          _react2.default.createElement(
            _ListViewGroupItemContainer2.default,
            {
              expanded: expanded,
              onClose: function onClose() {
                return _this2.toggleExpanded();
              }
            },
            children
          )
        );
      } else {
        return _react2.default.createElement(
          _ListViewGroupItem2.default,
          _extends({ stacked: stacked }, other),
          _react2.default.createElement(_ListViewRow2.default, {
            checkboxInput: checkboxInput,
            leftContent: leftContent,
            heading: heading,
            description: description,
            additionalInfo: additionalInfo,
            actions: actions
          })
        );
      }
    }
  }]);

  return ListViewItem;
}(_react2.default.Component);

exports.default = ListViewItem;

ListViewItem.propTypes = {
  /** Child node rendered as expanded content of the ListViewItem */
  children: _propTypes2.default.node,
  /** Display the ListViewItem stacked or not */
  stacked: _propTypes2.default.bool.isRequired,
  /** Function triggered when expandable content is expanded */
  onExpand: _propTypes2.default.func,
  /** Function triggered when expandable content is closed */
  onExpandClose: _propTypes2.default.func,
  /** Node which renders right-positioned actions (e.g. Buttons, DropdownKebab...) */
  actions: _propTypes2.default.node,
  /** An array of ListViewInfoItem instances to render additional info items */
  additionalInfo: _propTypes2.default.arrayOf(_propTypes2.default.node),
  /** Contents of ListViewItem description section */
  description: _propTypes2.default.node,
  /** Contents of ListViewItem heading */
  heading: _propTypes2.default.node,
  /** Contents for left section of ListViewItem (usually ListViewIcon) */
  leftContent: _propTypes2.default.node,
  /** Checkbox form input component */
  checkboxInput: _propTypes2.default.node
};
ListViewItem.defaultProps = {
  stacked: false
};