'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../../../index');

var _WizardPatternBody = require('./WizardPatternBody');

var _WizardPatternBody2 = _interopRequireDefault(_WizardPatternBody);

var _WizardPatternConstants = require('./WizardPatternConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * WizardPattern - the Wizard Pattern Body component.
 */
var WizardPattern = function WizardPattern(_ref) {
  var steps = _ref.steps,
      activeStepIndex = _ref.activeStepIndex,
      onStepChanged = _ref.onStepChanged,
      onNext = _ref.onNext,
      onBack = _ref.onBack,
      nextStepDisabled = _ref.nextStepDisabled,
      title = _ref.title,
      loadingTitle = _ref.loadingTitle,
      loadingMessage = _ref.loadingMessage,
      show = _ref.show,
      onHide = _ref.onHide,
      onExited = _ref.onExited,
      stepButtonsDisabled = _ref.stepButtonsDisabled,
      cancelText = _ref.cancelText,
      backText = _ref.backText,
      nextText = _ref.nextText,
      closeText = _ref.closeText,
      loading = _ref.loading;

  var onBackClick = function onBackClick() {
    goToStep(Math.max(activeStepIndex - 1, 0));
  };

  var onNextClick = function onNextClick() {
    goToStep(Math.min(activeStepIndex + 1, steps.length - 1));
  };

  var getActiveStep = function getActiveStep() {
    var relativeToIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : activeStepIndex;
    return steps[relativeToIndex];
  };

  var getPrevStep = function getPrevStep() {
    var relativeToIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : activeStepIndex;
    return relativeToIndex > 0 && steps[relativeToIndex - 1];
  };

  var getNextStep = function getNextStep() {
    var relativeToIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : activeStepIndex;
    return relativeToIndex < steps.length - 1 && steps[relativeToIndex + 1];
  };

  var goToStep = function goToStep(newStepIndex) {
    var currentStep = steps[activeStepIndex];
    if (shouldPreventGoToStep(newStepIndex)) return;
    if (onStepChanged) onStepChanged(newStepIndex);
    if (newStepIndex === activeStepIndex + 1) {
      if (currentStep.onNext) currentStep.onNext();
      if (onNext) onNext(newStepIndex);
    }
    if (newStepIndex === activeStepIndex - 1) {
      if (onBack) onBack(newStepIndex);
    }
  };

  var shouldPreventGoToStep = function shouldPreventGoToStep(newStepIndex) {
    var targetStep = steps[newStepIndex];
    var stepBeforeTarget = getPrevStep(newStepIndex);

    var preventExitActive = steps[activeStepIndex].preventExit;
    var preventEnterTarget = (0, _index.propExists)(targetStep, 'preventEnter') ? targetStep.preventEnter : stepBeforeTarget && stepBeforeTarget.isInvalid;
    var nextStepClicked = newStepIndex === activeStepIndex + 1;

    return preventExitActive || preventEnterTarget || nextStepClicked && nextStepDisabled;
  };

  var onFirstStep = activeStepIndex === 0;
  var onFinalStep = activeStepIndex === steps.length - 1;
  var activeStepStr = (activeStepIndex + 1).toString();
  var activeStep = getActiveStep();

  var prevStepUnreachable = onFirstStep || activeStep.preventExit || getPrevStep().preventEnter;
  var nextStepUnreachable = nextStepDisabled || activeStep.isInvalid || activeStep.preventExit || getNextStep().preventEnter;

  return _react2.default.createElement(
    _index.Wizard,
    { show: show, onHide: onHide, onExited: onExited },
    _react2.default.createElement(_index.Wizard.Header, { onClose: onHide, title: title }),
    _react2.default.createElement(
      _index.Wizard.Body,
      null,
      _react2.default.createElement(_WizardPatternBody2.default, {
        loadingTitle: loadingTitle,
        loadingMessage: loadingMessage,
        loading: loading,
        steps: steps,
        activeStepIndex: activeStepIndex,
        activeStepStr: activeStepStr,
        goToStep: goToStep,
        nextStepDisabled: nextStepDisabled,
        stepButtonsDisabled: stepButtonsDisabled
      })
    ),
    _react2.default.createElement(
      _index.Wizard.Footer,
      null,
      _react2.default.createElement(
        _index.Button,
        { bsStyle: 'default', className: 'btn-cancel', onClick: onHide },
        cancelText
      ),
      _react2.default.createElement(
        _index.Button,
        {
          bsStyle: 'default',
          onClick: onBackClick,
          disabled: prevStepUnreachable
        },
        _react2.default.createElement(_index.Icon, { type: 'fa', name: 'angle-left' }),
        backText
      ),
      _react2.default.createElement(
        _index.Button,
        {
          bsStyle: 'primary',
          onClick: onFinalStep ? onHide : onNextClick,
          disabled: nextStepUnreachable
        },
        onFinalStep ? closeText : _react2.default.createElement(
          _react2.default.Fragment,
          null,
          nextText,
          _react2.default.createElement(_index.Icon, { type: 'fa', name: 'angle-right' })
        )
      )
    )
  );
};

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
  loading: _propTypes2.default.bool,
  cancelText: _propTypes2.default.string,
  backText: _propTypes2.default.string,
  nextText: _propTypes2.default.string,
  closeText: _propTypes2.default.string,
  steps: _propTypes2.default.arrayOf(_propTypes2.default.shape(_WizardPatternConstants.wizardStepShape)),
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
  loading: false,
  cancelText: 'Cancel',
  backText: 'Back',
  nextText: 'Next',
  closeText: 'Close',
  steps: [],
  nextStepDisabled: false,
  stepButtonsDisabled: false
};

WizardPattern.displayName = 'WizardPattern';

exports.default = WizardPattern;