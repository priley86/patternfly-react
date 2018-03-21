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

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _reactLifecyclesCompat2 = _interopRequireDefault(_reactLifecyclesCompat);

var _WizardPattern = require('./WizardPattern');

var _WizardPattern2 = _interopRequireDefault(_WizardPattern);

var _WizardPatternConstants = require('./WizardPatternConstants');

var _index = require('../../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * StatefulWizardPattern - the Stateful Wizard Pattern component.
 */
var StatefulWizardPattern = function (_React$Component) {
  _inherits(StatefulWizardPattern, _React$Component);

  _createClass(StatefulWizardPattern, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        activeStepIndex: (0, _index.propOrState)(nextProps, prevState, 'activeStepIndex')
      };
    }
  }]);

  function StatefulWizardPattern(props) {
    _classCallCheck(this, StatefulWizardPattern);

    var _this = _possibleConstructorReturn(this, (StatefulWizardPattern.__proto__ || Object.getPrototypeOf(StatefulWizardPattern)).call(this, props));

    _this.state = { activeStepIndex: 0 };
    (0, _index.bindMethods)(_this, ['onStepChanged']);
    return _this;
  }

  _createClass(StatefulWizardPattern, [{
    key: 'onStepChanged',
    value: function onStepChanged(newStepIndex) {
      var _props = this.props,
          shouldPreventStepChange = _props.shouldPreventStepChange,
          steps = _props.steps;
      var activeStepIndex = this.state.activeStepIndex;
      var shouldPreventExit = steps[activeStepIndex].shouldPreventExit;
      var shouldPreventEnter = steps[newStepIndex].shouldPreventEnter;

      if (shouldPreventStepChange(activeStepIndex, newStepIndex) || shouldPreventExit && shouldPreventExit(newStepIndex) || shouldPreventEnter && shouldPreventEnter(activeStepIndex)) {
        return;
      }
      this.setState({ activeStepIndex: newStepIndex });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          shouldDisableNextStep = _props2.shouldDisableNextStep,
          steps = _props2.steps,
          otherProps = _objectWithoutProperties(_props2, ['shouldDisableNextStep', 'steps']);

      var activeStepIndex = this.state.activeStepIndex;

      return _react2.default.createElement(_WizardPattern2.default, _extends({
        nextStepDisabled: shouldDisableNextStep(activeStepIndex)
      }, otherProps, {
        steps: steps.map(function (step) {
          var shouldPreventEnter = step.shouldPreventEnter,
              shouldPreventExit = step.shouldPreventExit,
              otherStepProps = _objectWithoutProperties(step, ['shouldPreventEnter', 'shouldPreventExit']);

          return otherStepProps;
        }),
        activeStepIndex: activeStepIndex // Value from state, as set by getDerivedStateFromProps
        , onStepChanged: this.onStepChanged
      }));
    }
  }]);

  return StatefulWizardPattern;
}(_react2.default.Component);

StatefulWizardPattern.propTypes = _extends({}, _WizardPattern2.default.propTypes, {
  steps: _propTypes2.default.arrayOf(_propTypes2.default.shape(_extends({}, _WizardPatternConstants.wizardStepShape, {
    shouldPreventEnter: _propTypes2.default.func,
    shouldPreventExit: _propTypes2.default.func
  }))),
  shouldDisableNextStep: _propTypes2.default.func,
  shouldPreventStepChange: _propTypes2.default.func
});

StatefulWizardPattern.defaultProps = _extends({}, _WizardPattern2.default.defaultProps, {
  shouldDisableNextStep: _index.noop,
  shouldPreventStepChange: _index.noop
});

(0, _reactLifecyclesCompat2.default)(StatefulWizardPattern);

exports.default = StatefulWizardPattern;