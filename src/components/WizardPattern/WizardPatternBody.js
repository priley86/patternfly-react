import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods, noop, EmptyState, Spinner, Wizard } from '../../index';

class WizardPatternBody extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['stepProps', 'renderLoading']);
  }

  stepProps(stepIndex, title) {
    const { activeStepStr } = this.props;
    const label = (stepIndex + 1).toString();
    return {
      key: `wizard-step-${title}`,
      stepIndex,
      label,
      step: label,
      title,
      activeStep: activeStepStr
    };
  }

  renderLoading() {
    const { loadingTitle, loadingMessage } = this.props;
    return (
      <Wizard.Row>
        <Wizard.Main>
          <EmptyState>
            <Spinner size="lg" className="blank-slate-pf-icon" loading />
            <EmptyState.Action>
              <h3>{loadingTitle}</h3>
            </EmptyState.Action>
            <EmptyState.Action secondary>
              <p>{loadingMessage}</p>
            </EmptyState.Action>
          </EmptyState>
        </Wizard.Main>
      </Wizard.Row>
    );
  }

  render() {
    const { loaded, steps, activeStepIndex, goToStep } = this.props;
    const step = steps[activeStepIndex];

    if (!loaded) {
      return this.renderLoading();
    }

    const renderedStep =
      step && step.render && step.render(activeStepIndex, step.title);

    return (
      <React.Fragment>
        <Wizard.Steps
          steps={steps.map((stepObj, index) => (
            <Wizard.Step
              {...this.stepProps(index, stepObj.title)}
              onClick={() => goToStep(index)}
            />
          ))}
        />
        <Wizard.Row>
          <Wizard.Main>
            <Wizard.Contents
              stepIndex={activeStepIndex}
              activeStepIndex={activeStepIndex}
            >
              {renderedStep}
            </Wizard.Contents>
          </Wizard.Main>
        </Wizard.Row>
      </React.Fragment>
    );
  }
}

WizardPatternBody.propTypes = {
  loadingTitle: PropTypes.string,
  loadingMessage: PropTypes.string,
  loaded: PropTypes.bool,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      render: PropTypes.func,
      onNext: PropTypes.func
    })
  ),
  activeStepIndex: PropTypes.number,
  activeStepStr: PropTypes.string,
  goToStep: PropTypes.func,
  nextStepDisabled: PropTypes.bool,
  stepButtonsDisabled: PropTypes.bool
};

WizardPatternBody.defaultProps = {
  loadingTitle: 'Loading Wizard...',
  loadingMessage: 'Loading...',
  loaded: false,
  steps: [{ title: 'General', render: () => <p>General</p> }],
  activeStepIndex: 0,
  activeStepStr: '1',
  goToStep: noop,
  nextStepDisabled: false,
  stepButtonsDisabled: false
};

export default WizardPatternBody;
