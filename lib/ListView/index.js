'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListViewInfoItem = exports.ListViewAdditionalInfo = exports.ListViewDescriptionText = exports.ListViewDescriptionHeading = exports.ListViewDescription = exports.ListViewBody = exports.ListViewIcon = exports.ListViewLeft = exports.ListViewMainInfo = exports.ListViewActions = exports.ListViewExpand = exports.ListViewCheckbox = exports.ListGroupItemContainer = exports.ListGroupItemHeader = exports.ListGroupItem = exports.ListView = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/** 
 * Components in this module are used as building blocks for ListViewItem and
 * ListViewRow. If needed, components can be used to create custom ListViewItem
 *
 * Custom ListView example:
 *
 * <ListView>
 *   <ListGroupItem stacked expanded>
 *     <ListGroupItemHeader toggleExpanded={functionToToggle}> // required only if the ListGroupItem is supposed to be expandable
 *       <ListViewExpand expanded />
 *       <ListViewCheckbox />
 *       <ListViewActions>
 *         // buttons, dropdowns...
 *       </ListViewActions>
 *       <ListViewMainInfo>
 *         <ListViewLeft>
 *           <ListViewIcon size="sm" icon={iconClass} />
 *         </ListViewLeft>
 *         <ListViewBody>
 *           <ListViewDescription>
 *             <ListViewDescriptionHeading>
 *               {name}
 *             </ListViewDescriptionHeading>
 *             <ListViewDescriptionText>
 *               {description}
 *             </ListViewDescriptionText>
 *           </ListViewDescription>
 *           <ListViewAdditionalInfo>
 *             <ListViewInfoItem>
 *               <span className="pficon pficon-flavor" />
 *               {Item1}
 *             </ListViewInfoItem>
 *             <ListViewInfoItem>
 *               <span className="pficon pficon-cpu" />
 *               {Item2}
 *             </ListViewInfoItem>
 *           </ListViewAdditionalInfo>
 *         </ListViewBody>
 *       </ListViewMainInfo>
 *     </ListGroupItemHeader>
 * 
 *     <ListGroupItemContainer onClose={functionWhichClosesMe} expanded>
 *       <Row>Some content goes here</Row>
 *     </ListGroupItemContainer>
 * 
 *   </ListGroupItem>
 *   ...
 * </ListView>
 */

/**
 * ListView component wraps ListViewItems
 */
var ListView = function ListView(_ref) {
  var children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['children', 'className']);

  var classes = (0, _classnames2.default)('list-group list-view-pf list-view-pf-view', className);
  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, rest),
    children
  );
};
exports.ListView = ListView;
ListView.propTypes = {
  /** Additional css classes */
  className: _propTypes2.default.string,
  /** Children nodes - ListGroupItem or ListViewItem instances */
  children: _propTypes2.default.node

  /**
   * ListGroupItem is a root node of each ListViewItem
   */
};var ListGroupItem = function ListGroupItem(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      stacked = _ref2.stacked,
      expanded = _ref2.expanded,
      rest = _objectWithoutProperties(_ref2, ['children', 'className', 'stacked', 'expanded']);

  var classes = (0, _classnames2.default)('list-group-item', {
    'list-view-pf-expand-active': expanded,
    'list-view-pf-stacked': stacked
  }, className);
  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, rest),
    children
  );
};
exports.ListGroupItem = ListGroupItem;
ListGroupItem.propTypes = {
  /** Children nodes */
  children: _propTypes2.default.node,
  /** Additional css classes */
  className: _propTypes2.default.string,
  /** Toggles the item expanded */
  expanded: _propTypes2.default.bool.isRequired,
  /** Toggles the item stacked */
  stacked: _propTypes2.default.bool.isRequired
};
ListGroupItem.defaultProps = {
  expanded: false,
  stacked: false

  /** 
   * ListGroupItemHeader is used with expandable ListViewItem, wraps everything
   * that is displayed in non expanded state. Handles the toggling of the expanded
   * state
   */
};var ListGroupItemHeader = exports.ListGroupItemHeader = function ListGroupItemHeader(_ref3) {
  var children = _ref3.children,
      toggleExpanded = _ref3.toggleExpanded;

  var handleClick = function handleClick(e) {
    // ignore selected child elements click
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && e.target.tagName !== 'INPUT' && !e.target.classList.contains('fa-ellipsis-v')) {
      toggleExpanded();
    }
  };
  return _react2.default.createElement(
    'div',
    { className: 'list-group-item-header', onClick: handleClick },
    children
  );
};
ListGroupItemHeader.propTypes = {
  /** Children nodes */
  children: _propTypes2.default.node,
  /** Function to execute to trigger toggle */
  toggleExpanded: _propTypes2.default.func.isRequired

  /**
   * ListGroupItemContainer is used with expandable ListViewItem, wraps the
   * expanded content
   */
};var ListGroupItemContainer = exports.ListGroupItemContainer = function ListGroupItemContainer(_ref4) {
  var children = _ref4.children,
      expanded = _ref4.expanded,
      onClose = _ref4.onClose;

  var classes = (0, _classnames2.default)({
    'list-group-item-container container-fluid': true,
    hidden: !expanded
  });
  return _react2.default.createElement(
    'div',
    { className: classes },
    onClose && _react2.default.createElement(
      'div',
      { className: 'close' },
      _react2.default.createElement('span', { className: 'pficon pficon-close', onClick: onClose })
    ),
    expanded && children
  );
};
ListGroupItemContainer.propTypes = {
  /** Children nodes - the content visible in expanded state */
  children: _propTypes2.default.node,
  /** Boolean indicating whether expandable content is visible */
  expanded: _propTypes2.default.bool.isRequired,
  /** Function to call when 'close icon' is clicked */
  onClose: _propTypes2.default.func
};
ListGroupItemContainer.defaultProps = {
  expanded: false

  /**
   * ListViewCheckbox wraps the input provided as child prop. The input depends
   * on the form solution the consuming application uses (e.g. Field component
   * in case of redux-form)
   */
};var ListViewCheckbox = exports.ListViewCheckbox = function ListViewCheckbox(_ref5) {
  var children = _ref5.children,
      className = _ref5.className;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)('list-view-pf-checkbox', className) },
    children
  );
};

ListViewCheckbox.propTypes = {
  /** Child node - form input component */
  children: _propTypes2.default.node.isRequired,
  /** Additional css classes */
  className: _propTypes2.default.string

  /**
   * ListViewExpand renders the caret which signifies that row is expandable.
   * The caret icon points to the right when it is closed and down when it is expanded.
   */
};var ListViewExpand = exports.ListViewExpand = function ListViewExpand(_ref6) {
  var children = _ref6.children,
      expanded = _ref6.expanded,
      toggleExpanded = _ref6.toggleExpanded;

  var classes = (0, _classnames2.default)({
    'fa fa-angle-right': true,
    'fa-angle-down': expanded
  });
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)('list-view-pf-expand', { active: expanded }),
      onClick: function onClick(e) {
        e.stopPropagation();
        toggleExpanded();
      }
    },
    _react2.default.createElement('span', { className: classes }),
    children
  );
};
ListViewExpand.propTypes = {
  /** Child nodes which render additional content - used in expandable ListViewInfoItem */
  children: _propTypes2.default.node,
  /** Expanded state toggle */
  expanded: _propTypes2.default.bool.isRequired,
  /** Function to execute to trigger toggle */
  toggleExpanded: _propTypes2.default.func.isRequired
};
ListViewExpand.defaultProps = {
  expanded: false

  /** ListViewActions wraps ListViewItem actions and positions them to the right */
};var ListViewActions = exports.ListViewActions = function ListViewActions(_ref7) {
  var children = _ref7.children;
  return _react2.default.createElement(
    'div',
    { className: 'list-view-pf-actions' },
    children
  );
};
ListViewActions.propTypes = {
  /** Child nodes which render individual actions - Buttons, DropdownKebab... */
  children: _propTypes2.default.node

  /**
   * ListViewMainInfo wraps the informational content of the ListViewItem
   */
};var ListViewMainInfo = exports.ListViewMainInfo = function ListViewMainInfo(_ref8) {
  var children = _ref8.children;
  return _react2.default.createElement(
    'div',
    { className: 'list-view-pf-main-info' },
    children
  );
};
ListViewMainInfo.propTypes = {
  /** Child nodes - instances of ListViewLeft and ListViewBody */
  children: _propTypes2.default.node

  /** ListViewLeft renders nodes positioned on the left side of ListViewItem row */
};var ListViewLeft = exports.ListViewLeft = function ListViewLeft(_ref9) {
  var children = _ref9.children;
  return _react2.default.createElement(
    'div',
    { className: 'list-view-pf-left' },
    children
  );
};
ListViewLeft.propTypes = {
  /** Child nodes - usually ListViewIcon instance */
  children: _propTypes2.default.node

  /** ListViewIcon used as a default content for ListViewLeft */
};var ListViewIcon = function ListViewIcon(_ref10) {
  var icon = _ref10.icon,
      size = _ref10.size,
      rest = _objectWithoutProperties(_ref10, ['icon', 'size']);

  return _react2.default.createElement('span', _extends({ className: (0, _classnames2.default)('list-view-pf-icon-' + size, icon) }, rest));
};
exports.ListViewIcon = ListViewIcon;
ListViewIcon.propTypes = {
  /** CSS classes identifying the icon */
  icon: _propTypes2.default.string.isRequired,
  /** Icon size (sm, md, lg), defaults to 'sm' */
  size: _propTypes2.default.oneOf(['sm', 'md', 'lg'])
};
ListViewIcon.defaultProps = {
  size: 'sm'

  /** 
   * ListViewBody wraps the central section of ListViewItem
   */
};var ListViewBody = exports.ListViewBody = function ListViewBody(_ref11) {
  var children = _ref11.children;
  return _react2.default.createElement(
    'div',
    { className: 'list-view-pf-body' },
    children
  );
};
ListViewBody.propTypes = {
  /** Child nodes - ListViewDescription or ListViewAdditionalInfo instances */
  children: _propTypes2.default.node

  /** 
   * ListViewDescription wraps Heading and Text
   */
};var ListViewDescription = exports.ListViewDescription = function ListViewDescription(_ref12) {
  var children = _ref12.children;
  return _react2.default.createElement(
    'div',
    { className: 'list-view-pf-description' },
    children
  );
};
ListViewDescription.propTypes = {
  /** Child nodes - ListViewDescriptionHeading or ListViewDescriptionText instances */
  children: _propTypes2.default.node

  /** 
   * ListViewDescriptionHeading renders ListViewItem heading
   */
};var ListViewDescriptionHeading = exports.ListViewDescriptionHeading = function ListViewDescriptionHeading(_ref13) {
  var children = _ref13.children;
  return _react2.default.createElement(
    'div',
    { className: 'list-group-item-heading' },
    children
  );
};
ListViewDescriptionHeading.propTypes = {
  /** Child node - content rendered as heading */
  children: _propTypes2.default.node

  /**
   * ListViewDescriptionText renders text content of ListViewItem
   */
};var ListViewDescriptionText = exports.ListViewDescriptionText = function ListViewDescriptionText(_ref14) {
  var children = _ref14.children;
  return _react2.default.createElement(
    'div',
    { className: 'list-group-item-text' },
    children
  );
};
ListViewDescriptionText.propTypes = {
  /** Child node - content rendered in text section of ListViewItem */
  children: _propTypes2.default.node

  /** ListViewAdditionalInfo defines additional info section */
};var ListViewAdditionalInfo = exports.ListViewAdditionalInfo = function ListViewAdditionalInfo(_ref15) {
  var children = _ref15.children;
  return _react2.default.createElement(
    'div',
    { className: 'list-view-pf-additional-info' },
    children
  );
};
ListViewAdditionalInfo.propTypes = {
  /** Child nodes - an array of ListViewInfoItem instances */
  children: _propTypes2.default.arrayOf(_propTypes2.default.node)

  /**
   * ListViewInfoItem renders contents of individual Info item
   */
};var ListViewInfoItem = function ListViewInfoItem(_ref16) {
  var children = _ref16.children,
      className = _ref16.className,
      stacked = _ref16.stacked,
      rest = _objectWithoutProperties(_ref16, ['children', 'className', 'stacked']);

  var classes = (0, _classnames2.default)({ 'list-view-pf-additional-info-item-stacked': stacked }, 'list-view-pf-additional-info-item', className);
  return _react2.default.createElement(
    'div',
    _extends({ className: classes, onClick: function onClick(e) {
        return e.stopPropagation();
      } }, rest),
    children
  );
};
exports.ListViewInfoItem = ListViewInfoItem;
ListViewInfoItem.propTypes = {
  /** Child node - contents of the additional info item */
  children: _propTypes2.default.node,
  /** Additional css classes */
  className: _propTypes2.default.string,
  /** Toggle the InfoItem contents stacking */
  stacked: _propTypes2.default.bool.isRequired
};
ListViewInfoItem.defaultProps = {
  stacked: false
};