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

var _index = require('../../index');

var _ModalWizardBody = require('./ModalWizardBody');

var _ModalWizardBody2 = _interopRequireDefault(_ModalWizardBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalWizard = function (_React$Component) {
  _inherits(ModalWizard, _React$Component);

  _createClass(ModalWizard, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.controlledActiveStepIndex !== nextProps.activeStepIndex) {
        return {
          controlledActiveStepIndex: nextProps.activeStepIndex
        };
      }

      // Return null to indicate no change to state.
      return null;
    }
  }]);

  function ModalWizard() {
    _classCallCheck(this, ModalWizard);

    var _this = _possibleConstructorReturn(this, (ModalWizard.__proto__ || Object.getPrototypeOf(ModalWizard)).call(this));

    _this.state = {
      controlledActiveStepIndex: 0
    };

    (0, _index.bindMethods)(_this, ['onBackClick', 'onNextClick', 'goToStep']);
    return _this;
  }

  _createClass(ModalWizard, [{
    key: 'onBackClick',
    value: function onBackClick() {
      this.goToStep(Math.max(this.props.activeStepIndex - 1, 0));
    }
  }, {
    key: 'onNextClick',
    value: function onNextClick() {
      var steps = this.props.steps;
      var controlledActiveStepIndex = this.state.controlledActiveStepIndex;

      this.goToStep(Math.min(controlledActiveStepIndex + 1, steps.length - 1));
    }
  }, {
    key: 'goToStep',
    value: function goToStep(newStepIndex) {
      var controlledActiveStepIndex = this.state.controlledActiveStepIndex;
      var _props = this.props,
          onStepChanged = _props.onStepChanged,
          onNext = _props.onNext,
          onBack = _props.onBack,
          steps = _props.steps;


      var currentStep = steps[controlledActiveStepIndex];

      this.setState({ controlledActiveStepIndex: newStepIndex });

      if (onStepChanged) onStepChanged(newStepIndex);
      if (newStepIndex === controlledActiveStepIndex + 1) {
        if (currentStep.onNext) currentStep.onNext();
        if (onNext) onNext(newStepIndex);
      }
      if (newStepIndex === controlledActiveStepIndex - 1) {
        if (onBack) onBack(newStepIndex);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var controlledActiveStepIndex = this.state.controlledActiveStepIndex;

      var _props2 = this.props,
          title = _props2.title,
          show = _props2.show,
          onHide = _props2.onHide,
          onExited = _props2.onExited,
          steps = _props2.steps,
          shouldDisableNextStep = _props2.shouldDisableNextStep,
          stepButtonsDisabled = _props2.stepButtonsDisabled,
          cancelButtonText = _props2.cancelButtonText,
          backButtonText = _props2.backButtonText,
          nextButtonText = _props2.nextButtonText,
          closeButtonText = _props2.closeButtonText,
          activeStepIndex = _props2.activeStepIndex,
          otherProps = _objectWithoutProperties(_props2, ['title', 'show', 'onHide', 'onExited', 'steps', 'shouldDisableNextStep', 'stepButtonsDisabled', 'cancelButtonText', 'backButtonText', 'nextButtonText', 'closeButtonText', 'activeStepIndex']);

      var onFirstStep = controlledActiveStepIndex === 0;
      var onFinalStep = controlledActiveStepIndex === steps.length - 1;
      var activeStepStr = (controlledActiveStepIndex + 1).toString();

      var nextStepDisabled = shouldDisableNextStep(controlledActiveStepIndex);

      return _react2.default.createElement(
        _index.Modal,
        _extends({
          show: show,
          onHide: onHide,
          onExited: onExited,
          dialogClassName: 'modal-lg wizard-pf'
        }, otherProps),
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
            _react2.default.createElement(_ModalWizardBody2.default, _extends({}, this.props, {
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
                disabled: onFirstStep
              },
              _react2.default.createElement(_index.Icon, { type: 'fa', name: 'angle-left' }),
              backButtonText
            ),
            _react2.default.createElement(
              _index.Button,
              {
                bsStyle: 'primary',
                onClick: onFinalStep ? onHide : this.onNextClick,
                disabled: nextStepDisabled
              },
              onFinalStep ? closeButtonText : nextButtonText,
              _react2.default.createElement(_index.Icon, { type: 'fa', name: 'angle-right' })
            )
          )
        )
      );
    }
  }]);

  return ModalWizard;
}(_react2.default.Component);

ModalWizard.propTypes = {
  activeStepIndex: _propTypes2.default.number,
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
  steps: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    title: _propTypes2.default.string,
    render: _propTypes2.default.func,
    onNext: _propTypes2.default.func
  })),
  shouldDisableNextStep: _propTypes2.default.func,
  stepButtonsDisabled: _propTypes2.default.bool
};

ModalWizard.defaultProps = {
  activeStepIndex: 0,
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
  shouldDisableNextStep: function shouldDisableNextStep() {
    return false;
  },
  stepButtonsDisabled: false
};

(0, _reactLifecyclesCompat2.default)(ModalWizard);

exports.default = ModalWizard;