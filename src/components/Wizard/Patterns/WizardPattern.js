import React from 'react';
import PropTypes from 'prop-types';
import { noop, propExists, Wizard, Icon, Button } from '../../../index';
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
  cancelText,
  backText,
  nextText,
  closeText,
  loading
}) => {
  const onBackClick = () => {
    goToStep(Math.max(activeStepIndex - 1, 0));
  };

  const onNextClick = () => {
    goToStep(Math.min(activeStepIndex + 1, steps.length - 1));
  };

  const getStep = (index = activeStepIndex) => steps[index];

  const getPrevStep = (relativeToIndex = activeStepIndex) =>
    relativeToIndex > 0 && steps[relativeToIndex - 1];

  const getNextStep = (relativeToIndex = activeStepIndex) =>
    relativeToIndex < steps.length - 1 && steps[relativeToIndex + 1];

  const activeStep = getStep();

  const goToStep = newStepIndex => {
    if (shouldPreventGoToStep(newStepIndex)) return;
    if (onStepChanged) onStepChanged(newStepIndex);
    if (newStepIndex === activeStepIndex + 1) {
      if (activeStep.onNext) activeStep.onNext();
      if (onNext) onNext(newStepIndex);
    }
    if (newStepIndex === activeStepIndex - 1) {
      if (onBack) onBack(newStepIndex);
    }
  };

  const shouldPreventGoToStep = newStepIndex => {
    const targetStep = getStep(newStepIndex);
    const stepBeforeTarget = getPrevStep(newStepIndex);

    const preventExitActive = activeStep.preventExit;
    const preventEnterTarget =
      targetStep.preventEnter ||
      (stepBeforeTarget && stepBeforeTarget.isInvalid);
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

  const prevStepUnreachable =
    onFirstStep || activeStep.preventExit || getPrevStep().preventEnter;
  const nextStepUnreachable =
    nextStepDisabled ||
    activeStep.isInvalid ||
    activeStep.preventExit ||
    getNextStep().preventEnter;

  return (
    <Wizard show={show} onHide={onHide} onExited={onExited}>
      <Wizard.Header onClose={onHide} title={title} />
      <Wizard.Body>
        <WizardPatternBody
          loadingTitle={loadingTitle}
          loadingMessage={loadingMessage}
          loading={loading}
          steps={steps}
          activeStepIndex={activeStepIndex}
          activeStepStr={activeStepStr}
          goToStep={goToStep}
          nextStepDisabled={nextStepDisabled}
          stepButtonsDisabled={stepButtonsDisabled}
        />
      </Wizard.Body>
      <Wizard.Footer>
        <Button bsStyle="default" className="btn-cancel" onClick={onHide}>
          {cancelText}
        </Button>
        <Button
          bsStyle="default"
          onClick={onBackClick}
          disabled={prevStepUnreachable}
        >
          <Icon type="fa" name="angle-left" />
          {backText}
        </Button>
        <Button
          bsStyle="primary"
          onClick={onFinalStep ? onHide : onNextClick}
          disabled={nextStepUnreachable}
        >
          {onFinalStep ? (
            closeText
          ) : (
            <React.Fragment>
              {nextText}
              <Icon type="fa" name="angle-right" />
            </React.Fragment>
          )}
        </Button>
      </Wizard.Footer>
    </Wizard>
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
  loading: PropTypes.bool,
  cancelText: PropTypes.string,
  backText: PropTypes.string,
  nextText: PropTypes.string,
  closeText: PropTypes.string,
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

export default WizardPattern;
