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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalWizardBody = function (_React$Component) {
  _inherits(ModalWizardBody, _React$Component);

  function ModalWizardBody() {
    _classCallCheck(this, ModalWizardBody);

    var _this = _possibleConstructorReturn(this, (ModalWizardBody.__proto__ || Object.getPrototypeOf(ModalWizardBody)).call(this));

    (0, _index.bindMethods)(_this, ['onStepClick', 'stepProps', 'renderLoading']);
    return _this;
  }

  _createClass(ModalWizardBody, [{
    key: 'onStepClick',
    value: function onStepClick(stepIndex) {
      var _props = this.props,
          goToStep = _props.goToStep,
          nextStepDisabled = _props.nextStepDisabled,
          stepButtonsDisabled = _props.stepButtonsDisabled,
          activeStepIndex = _props.activeStepIndex;
      // Don't allow step clicks to skip into the future, but skipping into the past is ok.

      var nextStepClicked = stepIndex === activeStepIndex + 1;
      var futureStepClicked = stepIndex > activeStepIndex + 1;
      if (stepButtonsDisabled || nextStepClicked && nextStepDisabled || futureStepClicked) return;
      goToStep(stepIndex);
    }
  }, {
    key: 'stepProps',
    value: function stepProps(stepIndex, title) {
      var activeStepStr = this.props.activeStepStr;

      var label = (stepIndex + 1).toString();
      return {
        key: 'wizard-step-' + title,
        stepIndex: stepIndex,
        label: label,
        step: label,
        title: title,
        activeStep: activeStepStr
      };
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      var _props2 = this.props,
          loadingTitle = _props2.loadingTitle,
          loadingMessage = _props2.loadingMessage;

      return _react2.default.createElement(
        _index.Wizard.Row,
        null,
        _react2.default.createElement(
          _index.Wizard.Main,
          null,
          _react2.default.createElement(
            _index.EmptyState,
            null,
            _react2.default.createElement(_index.Spinner, { size: 'lg', className: 'blank-slate-pf-icon', loading: true }),
            _react2.default.createElement(
              _index.EmptyState.Action,
              null,
              _react2.default.createElement(
                'h3',
                null,
                loadingTitle
              )
            ),
            _react2.default.createElement(
              _index.EmptyState.Action,
              { secondary: true },
              _react2.default.createElement(
                'p',
                null,
                loadingMessage
              )
            )
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          loaded = _props3.loaded,
          steps = _props3.steps,
          activeStepIndex = _props3.activeStepIndex;

      var step = steps[activeStepIndex];

      if (!loaded) {
        return this.renderLoading();
      }

      var renderedStep = step && step.render && step.render(activeStepIndex, step.title);

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_index.Wizard.Steps, {
          steps: steps.map(function (stepObj, index) {
            return _react2.default.createElement(_index.Wizard.Step, _extends({}, _this2.stepProps(index, stepObj.title), {
              onClick: function onClick() {
                return _this2.onStepClick(index);
              }
            }));
          })
        }),
        _react2.default.createElement(
          _index.Wizard.Row,
          null,
          _react2.default.createElement(
            _index.Wizard.Main,
            null,
            _react2.default.createElement(
              _index.Wizard.Contents,
              {
                stepIndex: activeStepIndex,
                activeStepIndex: activeStepIndex
              },
              renderedStep
            )
          )
        )
      );
    }
  }]);

  return ModalWizardBody;
}(_react2.default.Component);

ModalWizardBody.propTypes = {
  loadingTitle: _propTypes2.default.string,
  loadingMessage: _propTypes2.default.string,
  loaded: _propTypes2.default.bool,
  steps: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    title: _propTypes2.default.string,
    render: _propTypes2.default.func,
    onNext: _propTypes2.default.func
  })),
  activeStepIndex: _propTypes2.default.number,
  activeStepStr: _propTypes2.default.string,
  goToStep: _propTypes2.default.func,
  nextStepDisabled: _propTypes2.default.bool,
  stepButtonsDisabled: _propTypes2.default.bool
};

ModalWizardBody.defaultProps = {
  loadingTitle: 'Loading Wizard...',
  loadingMessage: 'Loading...',
  loaded: false,
  steps: [{ title: 'General', render: function render() {
      return _react2.default.createElement(
        'p',
        null,
        'General'
      );
    } }],
  activeStepIndex: 0,
  activeStepStr: '1',
  goToStep: _index.noop,
  nextStepDisabled: false,
  stepButtonsDisabled: false
};

exports.default = ModalWizardBody;