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

var _ListGroup = require('../ListGroup');

var _VerticalNavItem = require('./VerticalNavItem');

var _VerticalNavItem2 = _interopRequireDefault(_VerticalNavItem);

var _VerticalNavMasthead = require('./VerticalNavMasthead');

var _VerticalNavMasthead2 = _interopRequireDefault(_VerticalNavMasthead);

var _helpers = require('../../common/helpers');

var _Timer = require('../../common/Timer');

var _Timer2 = _interopRequireDefault(_Timer);

var _controlled = require('../../common/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _patternfly = require('../../common/patternfly');

var _VerticalNavConstants = require('./VerticalNavConstants');

var _VerticalNavSecondaryItem = require('./VerticalNavSecondaryItem');

var _VerticalNavSecondaryItem2 = _interopRequireDefault(_VerticalNavSecondaryItem);

var _VerticalNavTertiaryItem = require('./VerticalNavTertiaryItem');

var _VerticalNavTertiaryItem2 = _interopRequireDefault(_VerticalNavTertiaryItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * VerticalNav - The Vertical Navigation pattern
 * http://www.patternfly.org/pattern-library/navigation/vertical-navigation/
 */
var BaseVerticalNav = function (_React$Component) {
  _inherits(BaseVerticalNav, _React$Component);

  function BaseVerticalNav(props) {
    _classCallCheck(this, BaseVerticalNav);

    // More state is defined in controlledStateTypes.
    // These ones just don't need to be able to be controlled by props.
    var _this = _possibleConstructorReturn(this, (BaseVerticalNav.__proto__ || Object.getPrototypeOf(BaseVerticalNav)).call(this, props));

    _this.state = {
      forceHidden: false, // eslint-disable-line react/no-unused-state
      controlledActivePath: false,
      controlledHoverPath: false,
      controlledMobilePath: false,
      controlledPinnedPath: false
    };
    _this.hoverTimer = new _Timer2.default();
    (0, _helpers.bindMethods)(_this, ['handleBodyClick', 'updateBodyClasses', 'clearBodyClasses', 'onLayoutChange', 'collapseMenu', 'expandMenu', 'updateNavOnMenuToggleClick', 'updateNavOnItemHover', 'updateNavOnItemBlur', 'updateNavOnItemClick', 'updateNavOnPin', 'updateNavOnMobileSelection', 'setActivePath', 'setHoverPath', 'setMobilePath', 'setPinnedPath', 'setControlledActivePath', 'setControlledHoverPath', 'setControlledMobilePath', 'setControlledPinnedPath', 'forceHideSecondaryMenu', 'navigateToItem']);
    return _this;
  }

  _createClass(BaseVerticalNav, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateBodyClasses();
      _patternfly.layout.addChangeListener(this.onLayoutChange);
      (0, _VerticalNavConstants.addBodyEventListener)('mousedown', this.handleBodyClick);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps) {
      var bodyClassProps = ['navCollapsed', 'pinnedPath', 'showMobileNav', 'isMobile'];
      if ((0, _helpers.propsChanged)(bodyClassProps, oldProps, this.props)) {
        this.updateBodyClasses();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Clear any timers so they don't trigger while the component is unmounted.
      this.hoverTimer.clearTimer();
      this.clearBodyClasses();
      _patternfly.layout.removeChangeListener(this.onLayoutChange);
      (0, _VerticalNavConstants.removeBodyEventListener)('mousedown', this.handleBodyClick);
    }
  }, {
    key: 'onLayoutChange',
    value: function onLayoutChange(newLayout) {
      var _props = this.props,
          onLayoutChange = _props.onLayoutChange,
          setControlledState = _props.setControlledState;

      setControlledState({ isMobile: newLayout === 'mobile' });
      onLayoutChange && onLayoutChange(newLayout);
    }
  }, {
    key: 'setActivePath',
    value: function setActivePath(activePath) {
      if (!this.state.controlledActivePath) {
        this.props.setControlledState({ activePath: activePath });
      }
    }
  }, {
    key: 'setControlledActivePath',
    value: function setControlledActivePath(controlledActivePath) {
      this.setState({ controlledActivePath: controlledActivePath });
    }
  }, {
    key: 'setControlledHoverPath',
    value: function setControlledHoverPath(controlledHoverPath) {
      this.setState({ controlledHoverPath: controlledHoverPath });
    }
  }, {
    key: 'setControlledMobilePath',
    value: function setControlledMobilePath(controlledMobilePath) {
      this.setState({ controlledMobilePath: controlledMobilePath });
    }
  }, {
    key: 'setControlledPinnedPath',
    value: function setControlledPinnedPath(controlledPinnedPath) {
      this.setState({ controlledPinnedPath: controlledPinnedPath });
    }
  }, {
    key: 'setHoverPath',
    value: function setHoverPath(hoverPath) {
      if (!this.state.controlledHoverPath) {
        this.props.setControlledState(_extends({
          hoverPath: hoverPath
        }, hoverPath === null ? { showMobileNav: false } : {}));
      }
    }
  }, {
    key: 'setMobilePath',
    value: function setMobilePath(mobilePath) {
      if (!this.state.controlledMobilePath) {
        this.props.setControlledState({ mobilePath: mobilePath });
      }
    }
  }, {
    key: 'setPinnedPath',
    value: function setPinnedPath(pinnedPath) {
      if (!this.state.controlledPinnedPath) {
        this.props.setControlledState({ pinnedPath: pinnedPath });
      }
    }
  }, {
    key: 'clearBodyClasses',
    value: function clearBodyClasses() {
      if (this.props.dynamicBodyClasses) {
        (0, _VerticalNavConstants.setBodyClassIf)(false, 'collapsed-nav');
        (0, _VerticalNavConstants.setBodyClassIf)(false, 'hidden-nav');
      }
    }
  }, {
    key: 'collapseMenu',
    value: function collapseMenu() {
      var _props2 = this.props,
          onCollapse = _props2.onCollapse,
          setControlledState = _props2.setControlledState;

      setControlledState({ navCollapsed: true });
      onCollapse && onCollapse();
    }
  }, {
    key: 'expandMenu',
    value: function expandMenu() {
      var _props3 = this.props,
          onExpand = _props3.onExpand,
          setControlledState = _props3.setControlledState;

      setControlledState({ navCollapsed: false });
      onExpand && onExpand();
    }
  }, {
    key: 'forceHideSecondaryMenu',
    value: function forceHideSecondaryMenu() {
      var _this2 = this;

      this.setState({ forceHidden: true }); // eslint-disable-line react/no-unused-state
      setTimeout(function () {
        _this2.setState({ forceHidden: false }); // eslint-disable-line react/no-unused-state
      }, 500);
    }
  }, {
    key: 'handleBodyClick',
    value: function handleBodyClick() {
      // Clear hover state on body click. Helps especially when using blurDisabled prop.
      this.setHoverPath(null);
    }
  }, {
    key: 'navigateToItem',
    value: function navigateToItem(item) {
      var onNavigate = this.props.onNavigate;

      onNavigate(item);
      // Note: This should become router-aware later on.
    }
  }, {
    key: 'updateBodyClasses',
    value: function updateBodyClasses() {
      // Note: Updating the body element classes from here like this is a hacky, non-react-y pattern.
      // It's only here for consistency. See comments on getBodyContentElement in ./constants.js.
      var _props4 = this.props,
          dynamicBodyClasses = _props4.dynamicBodyClasses,
          navCollapsed = _props4.navCollapsed,
          pinnedPath = _props4.pinnedPath,
          isMobile = _props4.isMobile;

      var collapsed = navCollapsed && pinnedPath === null;
      if (dynamicBodyClasses) {
        (0, _VerticalNavConstants.setBodyClassIf)(!isMobile && collapsed, 'collapsed-nav');
        (0, _VerticalNavConstants.setBodyClassIf)(isMobile, 'hidden-nav');
      }
    }
  }, {
    key: 'updateNavOnItemBlur',
    value: function updateNavOnItemBlur(primary, secondary, tertiary, idPath, parentPath, noDelay, callback) {
      var _this3 = this;

      var _props5 = this.props,
          hoverPath = _props5.hoverPath,
          blurDelay = _props5.blurDelay,
          blurDisabled = _props5.blurDisabled,
          setControlledState = _props5.setControlledState;

      var item = (0, _VerticalNavConstants.deepestOf)(primary, secondary, tertiary);
      var hovered = hoverPath && hoverPath.startsWith(idPath);
      this.hoverTimer.clearTimer();
      if (hovered) {
        var doBlur = function doBlur() {
          if (!blurDisabled) {
            // IMPORTANT: We reference this.props below for the hoverPath value when the timeout fires.
            // If we just use the hoverPath in scope from above, it is from when the timeout was set.
            if (idPath === _this3.props.hoverPath) {
              // Only bump up the hover path if it's still set to the item we're blurring
              setControlledState({ hoverPath: parentPath });
            }
            callback && callback(primary, secondary, tertiary);
          }
        };
        if (item.subItems && item.subItems.length > 0) {
          if (noDelay) {
            doBlur();
          } else {
            this.hoverTimer.startTimer(doBlur, blurDelay);
          }
        }
      }
    }
  }, {
    key: 'updateNavOnItemClick',
    value: function updateNavOnItemClick(primary, secondary, tertiary, idPath, parentPath) {
      var _props6 = this.props,
          onItemClick = _props6.onItemClick,
          hoverPath = _props6.hoverPath,
          hoverDisabled = _props6.hoverDisabled,
          isMobile = _props6.isMobile;

      this.hoverTimer.skipTimer();
      var item = (0, _VerticalNavConstants.deepestOf)(primary, secondary, tertiary);
      var isLeafItem = !item.subItems || item.subItems.length === 0;
      if (isMobile) {
        this.setMobilePath(null);
      }
      if (isLeafItem) {
        this.setHoverPath(null);
      } else if (hoverDisabled && hoverPath === idPath) {
        // Clicking the currently-"hovered" item in hoverDisabled un-"hovers" it.
        this.setHoverPath(parentPath);
      }
      if (isLeafItem || !isMobile) {
        this.navigateToItem(item);
      }
      onItemClick && onItemClick(primary, secondary, tertiary);
    }
  }, {
    key: 'updateNavOnItemHover',
    value: function updateNavOnItemHover(primary, secondary, tertiary, idPath, parentPath, callback) {
      var _props7 = this.props,
          onItemHover = _props7.onItemHover,
          hoverPath = _props7.hoverPath,
          hoverDelay = _props7.hoverDelay,
          hoverDisabled = _props7.hoverDisabled,
          isMobile = _props7.isMobile;

      var item = (0, _VerticalNavConstants.deepestOf)(primary, secondary, tertiary);
      var hovered = hoverPath && hoverPath.startsWith(idPath);
      var targetPath = item.subItems && item.subItems.length > 0 ? idPath : parentPath;
      var that = this;
      if (!isMobile) {
        this.hoverTimer.clearTimer();
        if (!hovered) {
          this.hoverTimer.startTimer(function (skipped) {
            if (skipped || !hoverDisabled) {
              that.setHoverPath(targetPath);
              callback && callback(primary, secondary, tertiary);
              onItemHover && onItemHover(primary, secondary, tertiary);
            }
          }, hoverDelay);
        }
      }
    }
  }, {
    key: 'updateNavOnMenuToggleClick',
    value: function updateNavOnMenuToggleClick() {
      var _props8 = this.props,
          onMenuToggleClick = _props8.onMenuToggleClick,
          isMobile = _props8.isMobile,
          showMobileNav = _props8.showMobileNav,
          navCollapsed = _props8.navCollapsed,
          setControlledState = _props8.setControlledState;

      if (isMobile) {
        if (showMobileNav) {
          setControlledState({ showMobileNav: false });
        } else {
          this.setMobilePath(null);
          setControlledState({ showMobileNav: true });
        }
      } else if (navCollapsed) {
        this.expandMenu();
      } else {
        this.collapseMenu();
      }
      onMenuToggleClick && onMenuToggleClick();
    }
  }, {
    key: 'updateNavOnMobileSelection',
    value: function updateNavOnMobileSelection(primary, secondary, tertiary) {
      var onMobileSelection = this.props.onMobileSelection;
      // All the behavior here is handled by mobilePath and setMobilePath,
      // but we still make a callback available here.

      onMobileSelection && onMobileSelection(primary, secondary, tertiary);
    }
  }, {
    key: 'updateNavOnPin',
    value: function updateNavOnPin(item, depth, pinned) {
      var _props9 = this.props,
          onItemPin = _props9.onItemPin,
          isMobile = _props9.isMobile;

      if (!isMobile) {
        onItemPin && onItemPin(item, depth, pinned);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props10 = this.props,
          items = _props10.items,
          children = _props10.children;
      // Nav items may be passed either as nested VerticalNavItem children, or as nested items in a prop.
      // The items prop will take priority, if present, and must be an array of item objects (not React components).
      // If the items prop is not present, items must be expressed as VerticalNavItem children instead.

      var itemsFromChildren = (0, _helpers.filterChildren)(children, function (child) {
        return child.type === _VerticalNavItem2.default;
      });
      var itemsFromProps = items && items.length > 0 && items.map(function (primaryItem, i) {
        return _react2.default.createElement(
          _VerticalNavItem2.default,
          {
            item: primaryItem,
            key: 'primary_' + primaryItem.title
          },
          primaryItem.subItems && primaryItem.subItems.map(function (secondaryItem) {
            return _react2.default.createElement(
              _VerticalNavSecondaryItem2.default,
              {
                item: secondaryItem,
                key: 'secondary_' + secondaryItem.title
              },
              secondaryItem.subItems && secondaryItem.subItems.map(function (tertiaryItem) {
                return _react2.default.createElement(_VerticalNavTertiaryItem2.default, {
                  item: tertiaryItem,
                  key: 'tertiary_' + tertiaryItem.title
                });
              })
            );
          })
        );
      });
      var itemComponents = itemsFromProps || itemsFromChildren || [];

      var masthead = (0, _helpers.findChild)(children, function (child) {
        return child.type === _VerticalNavMasthead2.default;
      });

      var _props11 = this.props,
          hiddenIcons = _props11.hiddenIcons,
          pinnableMenus = _props11.pinnableMenus,
          showBadges = _props11.showBadges,
          forceHidden = _props11.forceHidden,
          hideMasthead = _props11.hideMasthead,
          persistentSecondary = _props11.persistentSecondary,
          hoverDelay = _props11.hoverDelay,
          blurDelay = _props11.blurDelay,
          isMobile = _props11.isMobile,
          showMobileNav = _props11.showMobileNav,
          navCollapsed = _props11.navCollapsed,
          activePath = _props11.activePath,
          hoverPath = _props11.hoverPath,
          mobilePath = _props11.mobilePath,
          pinnedPath = _props11.pinnedPath;


      var getPathDepth = function getPathDepth(path) {
        return path && path.split('/').filter(function (s) {
          return s !== '';
        }).length;
      };
      var mobileDepth = getPathDepth(mobilePath);
      var hoverDepth = getPathDepth(hoverPath);
      var pinnedDepth = getPathDepth(pinnedPath);
      var showMobileSecondary = isMobile && mobileDepth >= 1;
      var showMobileTertiary = isMobile && mobileDepth >= 2;
      var hoverSecondaryNav = hoverDepth >= 1;
      var hoverTertiaryNav = hoverDepth >= 2;
      var pinnedSecondaryNav = pinnedDepth >= 1;
      var pinnedTertiaryNav = pinnedDepth >= 2;

      return _react2.default.createElement(
        _VerticalNavConstants.NavContextProvider,
        {
          idPath: '/',
          updateNavOnMenuToggleClick: this.updateNavOnMenuToggleClick,
          updateNavOnItemHover: this.updateNavOnItemHover,
          updateNavOnItemBlur: this.updateNavOnItemBlur,
          updateNavOnItemClick: this.updateNavOnItemClick,
          updateNavOnMobileSelection: this.updateNavOnMobileSelection,
          setActivePath: this.setActivePath,
          setHoverPath: this.setHoverPath,
          setMobilePath: this.setMobilePath,
          setPinnedPath: this.setPinnedPath,
          setControlledActivePath: this.setControlledActivePath,
          setControlledHoverPath: this.setControlledHoverPath,
          setControlledMobilePath: this.setControlledMobilePath,
          setControlledPinnedPath: this.setControlledPinnedPath,
          activePath: activePath,
          hoverPath: hoverPath,
          mobilePath: mobilePath,
          pinnedPath: pinnedPath,
          hiddenIcons: hiddenIcons,
          pinnableMenus: pinnableMenus,
          isMobile: isMobile,
          showMobileSecondary: showMobileSecondary,
          showMobileTertiary: showMobileTertiary,
          showBadges: showBadges,
          navCollapsed: navCollapsed,
          updateNavOnPin: this.updateNavOnPin,
          forceHideSecondaryMenu: this.forceHideSecondaryMenu,
          hoverDelay: hoverDelay,
          blurDelay: blurDelay
        },
        _react2.default.createElement(
          'nav',
          { className: (0, _classnames2.default)('navbar navbar-pf-vertical') },
          !hideMasthead && masthead
        ),
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('nav-pf-vertical nav-pf-vertical-with-sub-menus', {
              'nav-pf-vertical-collapsible-menus': pinnableMenus,
              'hidden-icons-pf': hiddenIcons,
              'nav-pf-vertical-with-badges': showBadges,
              'nav-pf-persistent-secondary': persistentSecondary,
              'show-mobile-secondary': showMobileSecondary,
              'show-mobile-tertiary': showMobileTertiary,
              'hover-secondary-nav-pf': hoverSecondaryNav,
              'hover-tertiary-nav-pf': hoverTertiaryNav,
              'collapsed-secondary-nav-pf': pinnedSecondaryNav,
              'collapsed-tertiary-nav-pf': pinnedTertiaryNav,
              hidden: isMobile,
              collapsed: !isMobile && navCollapsed,
              'force-hide-secondary-nav-pf': forceHidden,
              'show-mobile-nav': showMobileNav
            })
          },
          _react2.default.createElement(
            _ListGroup.ListGroup,
            { componentClass: 'ul' },
            itemComponents
          )
        )
      );
    }
  }]);

  return BaseVerticalNav;
}(_react2.default.Component);

var controlledState = {
  // NOTE: If you use any of these props, be sure to also use the corresponding callbacks/handlers.
  // These props override values of the same name set by setControlledState().
  types: {
    /** Use the mobile layout of the component. Corresponds to onLayoutChange callback. */
    isMobile: _propTypes2.default.bool,
    /** Display the nav in mobile mode */
    showMobileNav: _propTypes2.default.bool,
    /** Collapse the nav. Corresponds to onMenuToggleClick or onCollapse and onExpand callbacks. */
    navCollapsed: _propTypes2.default.bool,
    /** The idPath matching the currently active item. Corresponds to onItemClick callback. */
    activePath: _propTypes2.default.string,
    /** The idPath matching the currently hovered item. Corresponds to onItemHover and onItemBlur callbacks. */
    hoverPath: _propTypes2.default.string,
    /** The idPath matching the currently selected item on mobile. Corresponds to onMobileSelection callback. */
    mobilePath: _propTypes2.default.string,
    /** The idPath matching the currently pinned item. Corresponds to onItemPin callback. */
    pinnedPath: _propTypes2.default.string
  },
  defaults: {
    isMobile: _patternfly.layout.is('mobile'),
    showMobileNav: null,
    navCollapsed: null,
    activePath: null,
    hoverPath: null,
    mobilePath: null,
    pinnedPath: null
  },
  persist: ['navCollapsed', 'pinnedPath']
};

BaseVerticalNav.propTypes = _extends({}, controlledState.types, {
  /** Navigation items, passed as an array of objects (as opposed to JSX children w/ props) */
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape(_VerticalNavConstants.itemObjectTypes)),
  /** Enables the pin buttons on the active submenu. */
  pinnableMenus: _propTypes2.default.bool,
  /** Automatically applies classes to the body element when the layout changes. */
  dynamicBodyClasses: _propTypes2.default.bool,
  /** Hide all icons */
  hiddenIcons: _propTypes2.default.bool,
  /** Show badges in nav items */
  showBadges: _propTypes2.default.bool,
  /** Don't show items on hover, require a click */
  hoverDisabled: _propTypes2.default.bool,
  /** Don't hide items on blur, require a click elsewhere */
  blurDisabled: _propTypes2.default.bool,
  /** Force the nav to be hidden temporarily. */
  forceHidden: _propTypes2.default.bool,
  /** Hide the masthead and notification drawer areas. */
  hideMasthead: _propTypes2.default.bool,
  /** Persist the secondary nav */
  persistentSecondary: _propTypes2.default.bool,
  /** Delay between mouse hover and menu show in ms */
  hoverDelay: _propTypes2.default.number,
  /** Delay between mouse blur and menu hide in ms */
  blurDelay: _propTypes2.default.number,
  /** Optional callback for updating isMobile prop */
  onLayoutChange: _propTypes2.default.func, // eslint-disable-line react/require-default-props
  /** Optional callback for updating navCollapsed and showMobileNav props (option 1) */
  onMenuToggleClick: _propTypes2.default.func,
  /** Optional callback for updating navCollapsed and showMobileNav props (option 2) */
  onCollapse: _propTypes2.default.func,
  /** Optional callback for updating navCollapsed and showMobileNav props (option 2) */
  onExpand: _propTypes2.default.func,
  /** Optional callback for updating active props on items or activePath prop. Only called on leaf item click. */
  onNavigate: _propTypes2.default.func,
  /** Optional callback for updating active props on items or activePath prop. Called on any item click. */
  onItemClick: _propTypes2.default.func,
  /** Optional callback for updating hovered prop on items */
  onItemHover: _propTypes2.default.func,
  /** Optional callback for updating hovered prop on items */
  onItemBlur: _propTypes2.default.func,
  /** Optional callback for updating pinned props on items or pinnedPath prop. */
  onItemPin: _propTypes2.default.func,
  /** Optional callback for updating mobilePath prop */
  onMobileSelection: _propTypes2.default.func, // *
  /** Navigation items, passed as Item, SecondaryItem and TertiaryItem children. */
  children: _propTypes2.default.node,
  /** Helper injected by `controlled()` to manage controlledStateTypes values */
  setControlledState: _propTypes2.default.func // eslint-disable-line react/require-default-props
});

BaseVerticalNav.defaultProps = {
  items: null,
  pinnableMenus: false,
  dynamicBodyClasses: true,
  hiddenIcons: false,
  showBadges: false,
  hoverDisabled: false,
  blurDisabled: false,
  forceHidden: false,
  hideMasthead: false,
  persistentSecondary: true,
  hoverDelay: 500,
  blurDelay: 700,
  onMenuToggleClick: null,
  onCollapse: null,
  onExpand: null,
  onItemClick: null,
  onItemHover: null,
  onItemBlur: null,
  onItemPin: null,
  onMobileSelection: null,
  onNavigate: _helpers.noop,
  children: null
};

var VerticalNav = (0, _controlled2.default)(controlledState)(BaseVerticalNav);

VerticalNav.propTypes = _extends({}, BaseVerticalNav.propTypes);

VerticalNav.displayName = 'VerticalNav';

exports.default = VerticalNav;