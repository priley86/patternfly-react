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

var _index = require('../../index');

var _WizardPatternBody = require('./WizardPatternBody');

var _WizardPatternBody2 = _interopRequireDefault(_WizardPatternBody);

var _WizardPatternConstants = require('./WizardPatternConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WizardPattern = function (_React$Component) {
  _inherits(WizardPattern, _React$Component);

  function WizardPattern() {
    _classCallCheck(this, WizardPattern);

    var _this = _possibleConstructorReturn(this, (WizardPattern.__proto__ || Object.getPrototypeOf(WizardPattern)).call(this));

    (0, _index.bindMethods)(_this, ['getActiveStep', 'getPrevStep', 'getNextStep', 'onBackClick', 'onNextClick', 'goToStep', 'shouldPreventGoToStep']);
    return _this;
  }

  _createClass(WizardPattern, [{
    key: 'onNextClick',
    value: function onNextClick() {
      var _props = this.props,
          steps = _props.steps,
          activeStepIndex = _props.activeStepIndex;

      this.goToStep(Math.min(activeStepIndex + 1, steps.length - 1));
    }
  }, {
    key: 'getStep',
    value: function getStep() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.activeStepIndex;

      return this.props.steps[index];
    }
  }, {
    key: 'getPrevStep',
    value: function getPrevStep() {
      var relativeToIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.activeStepIndex;

      return relativeToIndex > 0 && this.props.steps[relativeToIndex - 1];
    }
  }, {
    key: 'getNextStep',
    value: function getNextStep() {
      var relativeToIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.activeStepIndex;
      var steps = this.props.steps;

      return relativeToIndex < steps.length - 1 && steps[relativeToIndex + 1];
    }
  }, {
    key: 'onBackClick',
    value: function onBackClick() {
      this.goToStep(Math.max(this.props.activeStepIndex - 1, 0));
    }
  }, {
    key: 'goToStep',
    value: function goToStep(newStepIndex) {
      var _props2 = this.props,
          onStepChanged = _props2.onStepChanged,
          activeStepIndex = _props2.activeStepIndex,
          onNext = _props2.onNext,
          onBack = _props2.onBack,
          steps = _props2.steps;

      var currentStep = steps[activeStepIndex];
      if (this.shouldPreventGoToStep(newStepIndex)) return;
      if (onStepChanged) onStepChanged(newStepIndex);
      if (newStepIndex === activeStepIndex + 1) {
        if (currentStep.onNext) currentStep.onNext();
        if (onNext) onNext(newStepIndex);
      }
      if (newStepIndex === activeStepIndex - 1) {
        if (onBack) onBack(newStepIndex);
      }
    }
  }, {
    key: 'shouldPreventGoToStep',
    value: function shouldPreventGoToStep(newStepIndex) {
      var _props3 = this.props,
          activeStepIndex = _props3.activeStepIndex,
          steps = _props3.steps,
          nextStepDisabled = _props3.nextStepDisabled;

      var targetStep = steps[newStepIndex];
      var stepBeforeTarget = newStepIndex > 0 && steps[newStepIndex - 1];

      var preventExitActive = this.getActiveStep().preventExit;
      var preventEnterTarget = (0, _index.propExists)(targetStep, 'preventEnter') ? targetStep.preventEnter : stepBeforeTarget && stepBeforeTarget.isInvalid;
      var nextStepClicked = newStepIndex === activeStepIndex + 1;

      return preventExitActive || preventEnterTarget || nextStepClicked && nextStepDisabled;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          title = _props4.title,
          show = _props4.show,
          onHide = _props4.onHide,
          onExited = _props4.onExited,
          activeStepIndex = _props4.activeStepIndex,
          steps = _props4.steps,
          nextStepDisabled = _props4.nextStepDisabled,
          stepButtonsDisabled = _props4.stepButtonsDisabled,
          cancelButtonText = _props4.cancelButtonText,
          backButtonText = _props4.backButtonText,
          nextButtonText = _props4.nextButtonText,
          closeButtonText = _props4.closeButtonText;

      var onFirstStep = activeStepIndex === 0;
      var onFinalStep = activeStepIndex === steps.length - 1;
      var activeStepStr = (activeStepIndex + 1).toString();

      var prevStepUnreachable = onFirstStep || this.getPrevStep(); // || ??
      var nextStepUnreachable = nextStepDisabled; // || ??

      return _react2.default.createElement(
        _index.Modal,
        {
          show: show,
          onHide: onHide,
          onExited: onExited,
          dialogClassName: 'modal-lg wizard-pf'
        },
        _react2.default.createElement(
          _index.Wizard,
          null,
          _react2.default.createElement(
            _index.Modal.Header,
            null,
            _react2.default.createElement(
              'button',
              {
                className: 'close',
                onClick: onHide,
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
          ),
          _react2.default.createElement(
            _index.Modal.Body,
            { className: 'wizard-pf-body clearfix' },
            _react2.default.createElement(_WizardPatternBody2.default, _extends({}, this.props, {
              goToStep: this.goToStep,
              nextStepDisabled: nextStepDisabled,
              stepButtonsDisabled: stepButtonsDisabled,
              activeStepStr: activeStepStr
            }))
          ),
          _react2.default.createElement(
            _index.Modal.Footer,
            { className: 'wizard-pf-footer' },
            _react2.default.createElement(
              _index.Button,
              { bsStyle: 'default', className: 'btn-cancel', onClick: onHide },
              cancelButtonText
            ),
            _react2.default.createElement(
              _index.Button,
              {
                bsStyle: 'default',
                onClick: this.onBackClick,
                disabled: prevStepUnreachable
              },
              _react2.default.createElement(_index.Icon, { type: 'fa', name: 'angle-left' }),
              backButtonText
            ),
            _react2.default.createElement(
              _index.Button,
              {
                bsStyle: 'primary',
                onClick: onFinalStep ? onHide : this.onNextClick,
                disabled: nextStepUnreachable
              },
              onFinalStep ? closeButtonText : _react2.default.createElement(
                _react2.default.Fragment,
                null,
                nextButtonText,
                _react2.default.createElement(_index.Icon, { type: 'fa', name: 'angle-right' })
              )
            )
          )
        )
      );
    }
  }]);

  return WizardPattern;
}(_react2.default.Component);

WizardPattern.propTypes = {
  activeStepIndex: _propTypes2.default.number.isRequired,
  show: _propTypes2.default.bool,
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  onHide: _propTypes2.default.func,
  onExited: _propTypes2.default.func,
  onBack: _propTypes2.default.func,
  onNext: _propTypes2.default.func,
  onStepChanged: _propTypes2.default.func,
  loadingTitle: _propTypes2.default.string,
  loadingMessage: _propTypes2.default.string,
  loaded: _propTypes2.default.bool,
  cancelButtonText: _propTypes2.default.string,
  backButtonText: _propTypes2.default.string,
  nextButtonText: _propTypes2.default.string,
  closeButtonText: _propTypes2.default.string,
  steps: _propTypes2.default.arrayOf(_propTypes2.default.shape(_WizardPatternConstants.stepShape)),
  nextStepDisabled: _propTypes2.default.bool,
  stepButtonsDisabled: _propTypes2.default.bool
};

WizardPattern.defaultProps = {
  show: false,
  title: '',
  onHide: _index.noop,
  onExited: _index.noop,
  onBack: _index.noop,
  onNext: _index.noop,
  onStepChanged: _index.noop,
  loadingTitle: 'Loading Wizard...',
  loadingMessage: 'Loading...',
  loaded: false,
  cancelButtonText: 'Cancel',
  backButtonText: 'Back',
  nextButtonText: 'Next',
  closeButtonText: 'Close',
  steps: [{ title: 'General', render: function render() {
      return _react2.default.createElement(
        'p',
        null,
        'General'
      );
    } }],
  nextStepDisabled: false,
  stepButtonsDisabled: false
};

WizardPattern.displayName = 'WizardPattern';

exports.default = WizardPattern;