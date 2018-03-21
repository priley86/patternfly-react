'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEY_CODES = exports.noop = exports.nullValues = exports.propsChanged = exports.findChild = exports.filterChildren = exports.childrenToArray = exports.filterKeys = exports.selectKeys = exports.propOrState = exports.propExists = exports.debounce = exports.bindMethods = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Equivalent to calling `this.someMethod = this.someMethod.bind(this)` for every method name in the methods array.
var bindMethods = exports.bindMethods = function bindMethods(context, methods) {
  methods.forEach(function (method) {
    context[method] = context[method].bind(context);
  });
};

// Implementation of the debounce function
var debounce = exports.debounce = function debounce(func, wait) {
  var timeout = void 0;
  function innerFunc() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return func.apply(context, args);
    }, wait);
  }
  return innerFunc;
};

// Returns true if propName is a non-null property of the props object (can be any object, not just React props).
var propExists = exports.propExists = function propExists(props, propName) {
  return props && props.hasOwnProperty(propName) && props[propName] !== null;
};

// Given two objects (props and state), returns the value of propName from props if present, or from state otherwise.
var propOrState = exports.propOrState = function propOrState(props, state, propName) {
  return propExists(props, propName) ? props[propName] : state[propName];
};

// Returns a subset of the given object including only the given keys, with values optionally replaced by a fn.
var selectKeys = exports.selectKeys = function selectKeys(obj, keys) {
  var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (val) {
    return val;
  };
  return keys.reduce(function (values, key) {
    return _extends({}, values, _defineProperty({}, key, fn(obj[key])));
  }, {});
};

// Returns a subset of the given object with a validator function applied to its keys.
var filterKeys = exports.filterKeys = function filterKeys(obj, validator) {
  return selectKeys(obj, Object.keys(obj).filter(validator));
};

// Returns the given React children prop as a regular array of React nodes.
var childrenToArray = exports.childrenToArray = function childrenToArray(children) {
  return children && _react2.default.Children.count(children) > 0 && _react2.default.Children.toArray(children);
};

// Filters the given React children prop with the given validator function. Returns an array of nodes.
var filterChildren = exports.filterChildren = function filterChildren(children, validator) {
  var array = childrenToArray(children);
  return array && array.filter(validator);
};

// Given a React children prop, finds the first child node to pass the validator function.
var findChild = exports.findChild = function findChild(children, validator) {
  var array = childrenToArray(children);
  return array && array.find(validator);
};

// Returns true if there is at least one of propNames with a different value in newProps than in oldProps.
var propsChanged = exports.propsChanged = function propsChanged(propNames, oldProps, newProps) {
  return propNames.some(function (propName) {
    return oldProps[propName] !== newProps[propName];
  });
};

// Returns an object with the same keys as the given one, but all null values.
var nullValues = exports.nullValues = function nullValues(obj) {
  return selectKeys(obj, Object.keys(obj), function () {
    return null;
  });
};

var noop = exports.noop = Function.prototype;

var KEY_CODES = exports.KEY_CODES = { TAB_KEY: 9, ENTER_KEY: 13, ESCAPE_KEY: 27 };