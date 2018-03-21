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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recompose = require('recompose');

var _ListGroup = require('../ListGroup');

var _OverlayTrigger = require('../OverlayTrigger');

var _Tooltip = require('../Tooltip');

var _VerticalNavBadge = require('./VerticalNavBadge');

var _VerticalNavBadge2 = _interopRequireDefault(_VerticalNavBadge);

var _helpers = require('../../common/helpers');

var _VerticalNavConstants = require('./VerticalNavConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseVerticalNavItemHelper = function (_React$Component) {
  _inherits(BaseVerticalNavItemHelper, _React$Component);

  function BaseVerticalNavItemHelper(props) {
    _classCallCheck(this, BaseVerticalNavItemHelper);

    var _this = _possibleConstructorReturn(this, (BaseVerticalNavItemHelper.__proto__ || Object.getPrototypeOf(BaseVerticalNavItemHelper)).call(this, props));

    (0, _helpers.bindMethods)(_this, ['navItem', 'id', 'idPath', 'setActive', 'getContextNavItems', 'pinNextDepth', 'onItemHover', 'onItemBlur', 'onItemClick', 'onMobileSelection']);
    return _this;
  }

  _createClass(BaseVerticalNavItemHelper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.active) {
        this.props.setControlledActivePath(true);
      }
      if (this.props.hovered) {
        this.props.setControlledHoverPath(true);
      }
      if (this.props.selectedOnMobile) {
        this.props.setControlledMobilePath(true);
      }
      if (this.props.pinned) {
        this.props.setControlledPinnedPath(true);
      }
      if (this.navItem().initialActive) {
        this.setActive();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _props = this.props,
          setControlledActivePath = _props.setControlledActivePath,
          setControlledHoverPath = _props.setControlledHoverPath,
          setControlledMobilePath = _props.setControlledMobilePath,
          setControlledPinnedPath = _props.setControlledPinnedPath;

      if (!this.props.active && newProps.active) {
        // If the active prop is being added, make sure the activePath is in sync.
        if (newProps.activePath !== this.idPath()) {
          this.setActive();
        }
        setControlledActivePath(true);
      }
      if (!this.props.hovered && newProps.hovered) {
        // If the hovered prop is being added, make sure the hoverPath is in sync.
        if (newProps.hoverPath !== this.idPath()) {
          this.setHovered();
        }
        setControlledHoverPath(true);
      }
      if (!this.props.selectedOnMobile && newProps.selectedOnMobile) {
        // If the selectedOnMobile prop is being added, make sure the mobilePath is in sync.
        if (newProps.mobilePath !== this.idPath()) {
          this.setMobilePath(this.idPath());
        }
        setControlledMobilePath(true);
      }
      if (!this.props.pinned && newProps.pinned) {
        // If the pinned prop is being added, make sure the pinnedPath is in sync.
        if (newProps.pinnedPath !== this.idPath()) {
          this.setPinnedPath(this.idPath());
        }
        setControlledPinnedPath(true);
      }
    }
  }, {
    key: 'onItemBlur',
    value: function onItemBlur(noDelay) {
      var _getContextNavItems = this.getContextNavItems(),
          primary = _getContextNavItems.primary,
          secondary = _getContextNavItems.secondary,
          tertiary = _getContextNavItems.tertiary;

      var _props2 = this.props,
          updateNavOnItemBlur = _props2.updateNavOnItemBlur,
          idPath = _props2.idPath,
          onBlur = _props2.onBlur;

      updateNavOnItemBlur(primary, secondary, tertiary, this.idPath(), idPath, noDelay, onBlur);
    }
  }, {
    key: 'onItemClick',
    value: function onItemClick(event) {
      var _getContextNavItems2 = this.getContextNavItems(),
          primary = _getContextNavItems2.primary,
          secondary = _getContextNavItems2.secondary,
          tertiary = _getContextNavItems2.tertiary;

      var _props3 = this.props,
          isMobile = _props3.isMobile,
          updateNavOnItemClick = _props3.updateNavOnItemClick,
          idPath = _props3.idPath;

      var _navItem = this.navItem(),
          href = _navItem.href,
          onClick = _navItem.onClick;

      event.preventDefault();
      updateNavOnItemClick(primary, secondary, tertiary, this.idPath(), idPath); // Clears all mobile selections
      if (isMobile) {
        this.onMobileSelection(primary, secondary, tertiary); // Applies new mobile selection here
      }
      this.setActive();
      onClick && onClick(primary, secondary, tertiary);
      if (href) {
        window.location = href; // Note: This should become router-aware later on.
      }
    }
  }, {
    key: 'onItemHover',
    value: function onItemHover() {
      var _getContextNavItems3 = this.getContextNavItems(),
          primary = _getContextNavItems3.primary,
          secondary = _getContextNavItems3.secondary,
          tertiary = _getContextNavItems3.tertiary;

      var _props4 = this.props,
          updateNavOnItemHover = _props4.updateNavOnItemHover,
          idPath = _props4.idPath,
          onHover = _props4.onHover;

      updateNavOnItemHover(primary, secondary, tertiary, this.idPath(), idPath, onHover);
    }
  }, {
    key: 'onMobileSelection',
    value: function onMobileSelection(primary, secondary, tertiary) {
      var _props5 = this.props,
          setMobilePath = _props5.setMobilePath,
          updateNavOnMobileSelection = _props5.updateNavOnMobileSelection;

      setMobilePath(this.idPath());
      updateNavOnMobileSelection(primary, secondary, tertiary);
    }
  }, {
    key: 'getContextNavItems',
    value: function getContextNavItems() {
      // We have primary, secondary, and tertiary items as props if they are part of the parent context,
      // but we also want to include the current item when calling handlers.
      var _props6 = this.props,
          depth = _props6.depth,
          primaryItem = _props6.primaryItem,
          secondaryItem = _props6.secondaryItem,
          tertiaryItem = _props6.tertiaryItem;

      var navItem = this.navItem();
      return {
        primary: depth === 'primary' ? navItem : primaryItem,
        secondary: depth === 'secondary' ? navItem : secondaryItem,
        tertiary: depth === 'tertiary' ? navItem : tertiaryItem
      };
    }
  }, {
    key: 'setActive',
    value: function setActive() {
      this.props.setActivePath(this.idPath());
    }
  }, {
    key: 'setHovered',
    value: function setHovered() {
      this.props.setHoverPath(this.idPath());
    }
  }, {
    key: 'id',
    value: function id() {
      var _navItem2 = this.navItem(null, true),
          id = _navItem2.id,
          title = _navItem2.title; // Need to ignorePath here so we don't get an infinite call stack...


      return id || title || this.props.index;
    }
  }, {
    key: 'idPath',
    value: function idPath() {
      return '' + this.props.idPath + this.id() + '/';
    }
  }, {
    key: 'navItem',
    value: function navItem(oldProps, ignorePath) {
      var _this2 = this;

      var props = oldProps || this.props;
      // Properties of the item object take priority over individual item props
      var item = _extends({}, (0, _VerticalNavConstants.getItemProps)(props), props.item);
      // Automatically set the active, hovered, and selectedOnMobile properties based on current path...
      // ...But don't call idPath() when called from inside id(), or there will be an infinite loop.
      var valOrOnPath = function valOrOnPath(val, path) {
        return val || (ignorePath ? null : path && path.startsWith(_this2.idPath()));
      };
      return _extends({}, item, {
        active: valOrOnPath(item.active, props.activePath),
        hovered: valOrOnPath(item.hovered, props.hoverPath),
        selectedOnMobile: valOrOnPath(item.selectedOnMobile, props.mobilePath),
        pinned: valOrOnPath(item.pinned, props.pinnedPath)
      });
    }
  }, {
    key: 'pinNextDepth',
    value: function pinNextDepth() {
      var _props7 = this.props,
          isMobile = _props7.isMobile,
          depth = _props7.depth,
          setMobilePath = _props7.setMobilePath,
          forceHideSecondaryMenu = _props7.forceHideSecondaryMenu,
          setPinnedPath = _props7.setPinnedPath,
          updateNavOnPin = _props7.updateNavOnPin,
          idPath = _props7.idPath,
          pinnedPath = _props7.pinnedPath;

      var nextDepth = (0, _VerticalNavConstants.getNextDepth)(depth);
      if (isMobile) {
        // On mobile, the pin buttons act as back buttons instead.
        if (depth === 'primary') {
          // Going back to primary nav clears all selection.
          setMobilePath(null);
        } else if (depth === 'secondary') {
          // Going back to secondary nav de-selects this item and re-selects the parent.
          setMobilePath(idPath); // idPath prop, which is parent's path, not this.idPath().
        }
      } else {
        setPinnedPath(!pinnedPath ? this.idPath() : null);
        if (pinnedPath) {
          forceHideSecondaryMenu();
          this.onItemBlur(true);
        }
      }
      updateNavOnPin(this.navItem(), nextDepth, !pinnedPath);
    }
  }, {
    key: 'render',
    value: function render() {
      var _cx,
          _this3 = this;

      var _props8 = this.props,
          pinnableMenus = _props8.pinnableMenus,
          hiddenIcons = _props8.hiddenIcons,
          navCollapsed = _props8.navCollapsed,
          showMobileSecondary = _props8.showMobileSecondary,
          showMobileTertiary = _props8.showMobileTertiary,
          showBadges = _props8.showBadges,
          children = _props8.children,
          isMobile = _props8.isMobile,
          pinnedPath = _props8.pinnedPath;

      // The nav item can either be passed directly as one item object prop, or as individual props.

      var navItem = this.navItem();
      var active = navItem.active,
          hovered = navItem.hovered,
          selectedOnMobile = navItem.selectedOnMobile,
          pinned = navItem.pinned,
          title = navItem.title,
          iconClass = navItem.iconClass,
          badges = navItem.badges,
          subItems = navItem.subItems,
          href = navItem.href,
          onClick = navItem.onClick,
          className = navItem.className;


      var depth = this.props.depth || 'primary';
      var nextDepth = (0, _VerticalNavConstants.getNextDepth)(depth);
      var NextDepthItem = (0, _VerticalNavConstants.componentForDepth)(nextDepth);

      var childItemComponents = (0, _helpers.filterChildren)(children, _VerticalNavConstants.isNavItem) || subItems && subItems.length > 0 && subItems.map(function (childItem) {
        return _react2.default.createElement(NextDepthItem, { item: childItem, key: childItem.title });
      });

      if (!childItemComponents && !href && !onClick) {
        // eslint-disable-next-line
        console.warn('Warning: Non-navigable item at', this.idPath(), '\nNav items should have one or more of: subItems, href, onClick.');
      }

      var childBadgeComponents = (0, _helpers.filterChildren)(children, function (child) {
        return child.type === _VerticalNavBadge2.default;
      }) || badges && badges.length > 0 && badges.map(function (badge) {
        var badgeKey = badge.badgeClass || badge.iconClass || badge.tooltip || badge.count;
        return _react2.default.createElement(_VerticalNavBadge2.default, _extends({}, badge, { key: badgeKey }));
      });

      var onPinnedPath = pinnedPath && pinnedPath.startsWith(this.idPath());

      var icon = iconClass && _react2.default.createElement('span', { className: (0, _classnames2.default)(iconClass, { hidden: hiddenIcons }), title: title });

      return _react2.default.createElement(
        _ListGroup.ListGroupItem,
        {
          listItem: true // Renders as <li>. Other props can change this, see logic in react-bootstrap's ListGroupItem.
          , className: (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, nextDepth + '-nav-item-pf', depth !== 'tertiary' && childItemComponents && childItemComponents.length > 0), _defineProperty(_cx, 'active', active || pinned), _defineProperty(_cx, 'is-hover', onPinnedPath || depth !== 'tertiary' && hovered), _defineProperty(_cx, 'mobile-nav-item-pf', selectedOnMobile && (depth === 'primary' && showMobileSecondary || depth === 'secondary')), _defineProperty(_cx, 'mobile-secondary-item-pf', selectedOnMobile && depth === 'primary' && showMobileTertiary), _cx), className),
          onMouseEnter: this.onItemHover
          // NOTE onItemBlur takes a boolean, we want to prevent it being passed a truthy event.
          , onMouseLeave: function onMouseLeave(e) {
            return _this3.onItemBlur(false);
          }
        },
        _react2.default.createElement(
          'a',
          { href: '#', onClick: this.onItemClick },
          depth === 'primary' && icon && (!isMobile && navCollapsed ? _react2.default.createElement(
            _OverlayTrigger.OverlayTrigger,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip.Tooltip,
                { id: title },
                title
              )
            },
            icon
          ) : icon),
          _react2.default.createElement(
            'span',
            { className: 'list-group-item-value' },
            title
          ),
          showBadges && childBadgeComponents && _react2.default.createElement(
            'div',
            { className: 'badge-container-pf' },
            childBadgeComponents
          )
        ),
        childItemComponents && childItemComponents.length > 0 && _react2.default.createElement(
          'div',
          { className: 'nav-pf-' + nextDepth + '-nav' },
          _react2.default.createElement(
            'div',
            { className: 'nav-item-pf-header' },
            (pinnableMenus || isMobile) && _react2.default.createElement('a', {
              className: (0, _classnames2.default)(nextDepth + '-collapse-toggle-pf', {
                collapsed: onPinnedPath
              }),
              onClick: this.pinNextDepth
            }),
            _react2.default.createElement(
              'span',
              null,
              title
            )
          ),
          _react2.default.createElement(
            _VerticalNavConstants.NavContextProvider,
            _extends({}, this.props, {
              idPath: this.idPath(),
              item: navItem
            }),
            _react2.default.createElement(
              _ListGroup.ListGroup,
              { componentClass: 'ul' },
              childItemComponents
            )
          )
        )
      );
    }
  }]);

  return BaseVerticalNavItemHelper;
}(_react2.default.Component);

BaseVerticalNavItemHelper.propTypes = _extends({}, _VerticalNavConstants.itemObjectTypes, _VerticalNavConstants.navContextTypes, {
  /** Properties of the nav item, as an object. Can alternatively be passed as individual props. */
  item: _propTypes2.default.shape(_VerticalNavConstants.itemObjectTypes),
  /**
   * Sub-items, passed as JSX children (SecondaryItem, TertiaryItem).
   * Can alternatively pass subItems array as part of item or as its own prop.
   */
  children: _propTypes2.default.node,
  title: _propTypes2.default.string
});

BaseVerticalNavItemHelper.defaultProps = {
  item: {},
  children: null,
  title: ''
};

var VerticalNavItemHelper = (0, _recompose.getContext)(_VerticalNavConstants.navContextTypes)(BaseVerticalNavItemHelper);

VerticalNavItemHelper.displayName = 'VerticalNavItemHelper';
VerticalNavItemHelper.propTypes = _extends({}, BaseVerticalNavItemHelper.propTypes);

exports.default = VerticalNavItemHelper;