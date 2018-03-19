import React from 'react';
import PropTypes from 'prop-types';
import { noop, propExists, Modal, Wizard, Icon, Button } from '../../../index';
import WizardPatternBody from './WizardPatternBody';
import { wizardStepShape } from './WizardPatternConstants';

/**
 * WizardPattern - the Wizard Pattern Body component.
 */
const WizardPattern = ({
  steps,
  activeStepIndex,
  onStepChanged,
  onNext,
  onBack,
  nextStepDisabled,
  title,
  loadingTitle,
  loadingMessage,
  show,
  onHide,
  onExited,
  stepButtonsDisabled,
  cancelButtonText,
  backButtonText,
  nextButtonText,
  closeButtonText,
  loaded
}) => {
  const onNextClick = () => {
    goToStep(Math.min(activeStepIndex + 1, steps.length - 1));
  };

  const getPrevStep = (relativeToIndex = activeStepIndex) =>
    relativeToIndex > 0 && steps[relativeToIndex - 1];

  const onBackClick = () => {
    goToStep(Math.max(activeStepIndex - 1, 0));
  };

  const goToStep = newStepIndex => {
    const currentStep = steps[activeStepIndex];
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

  const shouldPreventGoToStep = newStepIndex => {
    const targetStep = steps[newStepIndex];
    const stepBeforeTarget = newStepIndex > 0 && steps[newStepIndex - 1];

    const preventExitActive = steps[activeStepIndex].preventExit;
    const preventEnterTarget = propExists(targetStep, 'preventEnter')
      ? targetStep.preventEnter
      : stepBeforeTarget && stepBeforeTarget.isInvalid;
    const nextStepClicked = newStepIndex === activeStepIndex + 1;

    return (
      preventExitActive ||
      preventEnterTarget ||
      (nextStepClicked && nextStepDisabled)
    );
  };

  const onFirstStep = activeStepIndex === 0;
  const onFinalStep = activeStepIndex === steps.length - 1;
  const activeStepStr = (activeStepIndex + 1).toString();
  const activeStep = getActiveStep();
  const prevStepUnreachable = onFirstStep || activeStep.preventExit || getPrevStep().preventEnter;
  const nextStepUnreachable = nextStepDisabled || activeStep.isInvalid || activeStep.preventExit;

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
            loadingTitle={loadingTitle}
            loadingMessage={loadingMessage}
            loaded={loaded}
            steps={steps}
            activeStepIndex={activeStepIndex}
            activeStepStr={activeStepStr}
            goToStep={goToStep}
            nextStepDisabled={nextStepDisabled}
            stepButtonsDisabled={stepButtonsDisabled}
          />
        </Modal.Body>
        <Modal.Footer className="wizard-pf-footer">
          <Button bsStyle="default" className="btn-cancel" onClick={onHide}>
            {cancelButtonText}
          </Button>
          <Button
            bsStyle="default"
            onClick={onBackClick}
            disabled={prevStepUnreachable}
          >
            <Icon type="fa" name="angle-left" />
            {backButtonText}
          </Button>
          <Button
            bsStyle="primary"
            onClick={onFinalStep ? onHide : onNextClick}
            disabled={nextStepUnreachable}
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
};

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
  steps: PropTypes.arrayOf(PropTypes.shape(wizardStepShape)),
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
