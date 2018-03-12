import React from 'react';
import PropTypes from 'prop-types';
import {
  noop,
  bindMethods,
  propExists,
  Modal,
  Wizard,
  Icon,
  Button
} from '../../index';
import WizardPatternBody from './WizardPatternBody';
import { stepShape } from './WizardPatternConstants';

class WizardPattern extends React.Component {
  constructor() {
    super();
    bindMethods(this, [
      'onBackClick',
      'onNextClick',
      'goToStep',
      'shouldPreventGoToStep'
    ]);
  }

  onBackClick() {
    this.goToStep(Math.max(this.props.activeStepIndex - 1, 0));
  }

  onNextClick() {
    const { steps, activeStepIndex } = this.props;
    this.goToStep(Math.min(activeStepIndex + 1, steps.length - 1));
  }

  goToStep(newStepIndex) {
    const {
      onStepChanged,
      activeStepIndex,
      onNext,
      onBack,
      steps
    } = this.props;
    const currentStep = steps[activeStepIndex];
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

  shouldPreventGoToStep(newStepIndex) {
    const { activeStepIndex, steps } = this.props;
    const activeStep = steps[activeStepIndex];
    const targetStep = steps[newStepIndex];
    const prevStep = activeStepIndex > 0 && steps[newStepIndex - 1];

    const preventExitActive = activeStep.preventExit;
    const preventEnterTarget = propExists(targetStep, 'preventEnter')
      ? targetStep.preventEnter
      : prevStep && prevStep.isInvalid;

    return preventExitActive || preventEnterTarget;
  }

  render() {
    const {
      title,
      show,
      onHide,
      onExited,
      activeStepIndex,
      steps,
      nextStepDisabled,
      stepButtonsDisabled,
      cancelButtonText,
      backButtonText,
      nextButtonText,
      closeButtonText
    } = this.props;
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === steps.length - 1;
    const activeStepStr = (activeStepIndex + 1).toString();

    return (
      <Modal
        show={show}
        onHide={onHide}
        onExited={onExited}
        dialogClassName="modal-lg wizard-pf"
      >
        <Wizard>
          <Modal.Header>
            <button
              className="close"
              onClick={onHide}
              aria-hidden="true"
              aria-label="Close"
            >
              <Icon type="pf" name="close" />
            </button>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="wizard-pf-body clearfix">
            <WizardPatternBody
              {...this.props}
              goToStep={this.goToStep}
              nextStepDisabled={nextStepDisabled}
              stepButtonsDisabled={stepButtonsDisabled}
              activeStepStr={activeStepStr}
            />
          </Modal.Body>
          <Modal.Footer className="wizard-pf-footer">
            <Button bsStyle="default" className="btn-cancel" onClick={onHide}>
              {cancelButtonText}
            </Button>
            <Button
              bsStyle="default"
              onClick={this.onBackClick}
              disabled={onFirstStep}
            >
              <Icon type="fa" name="angle-left" />
              {backButtonText}
            </Button>
            <Button
              bsStyle="primary"
              onClick={onFinalStep ? onHide : this.onNextClick}
              disabled={nextStepDisabled}
            >
              {onFinalStep ? (
                closeButtonText
              ) : (
                  <React.Fragment>
                    {nextButtonText}
                    <Icon type="fa" name="angle-right" />
                  </React.Fragment>
                )}
            </Button>
          </Modal.Footer>
        </Wizard>
      </Modal>
    );
  }
}

WizardPattern.propTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  show: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onHide: PropTypes.func,
  onExited: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  onStepChanged: PropTypes.func,
  loadingTitle: PropTypes.string,
  loadingMessage: PropTypes.string,
  loaded: PropTypes.bool,
  cancelButtonText: PropTypes.string,
  backButtonText: PropTypes.string,
  nextButtonText: PropTypes.string,
  closeButtonText: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.shape(stepShape)),
  nextStepDisabled: PropTypes.bool,
  stepButtonsDisabled: PropTypes.bool
};

WizardPattern.defaultProps = {
  show: false,
  title: '',
  onHide: noop,
  onExited: noop,
  onBack: noop,
  onNext: noop,
  onStepChanged: noop,
  loadingTitle: 'Loading Wizard...',
  loadingMessage: 'Loading...',
  loaded: false,
  cancelButtonText: 'Cancel',
  backButtonText: 'Back',
  nextButtonText: 'Next',
  closeButtonText: 'Close',
  steps: [{ title: 'General', render: () => <p>General</p> }],
  nextStepDisabled: false,
  stepButtonsDisabled: false
};

WizardPattern.displayName = 'WizardPattern';

export default WizardPattern;
