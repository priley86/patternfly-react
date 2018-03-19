import React from 'react';
import PropTypes from 'prop-types';
import polyfill from 'react-lifecycles-compat';

import WizardPattern from './WizardPattern';
import { wizardStepShape } from './WizardPatternConstants';
import { propOrState, bindMethods } from '../../../index';

/**
 * StatefulWizardPattern - the Stateful Wizard Pattern component.
 */
class StatefulWizardPattern extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      activeStepIndex: propOrState(nextProps, prevState, 'activeStepIndex')
    };
  }

  constructor(props) {
    super(props);
    this.state = { activeStepIndex: 0 };
    bindMethods(this, ['onStepChanged']);
  }

  onStepChanged(newStepIndex) {
    const { shouldPreventStepChange, steps } = this.props;
    const { activeStepIndex } = this.state;
    const { shouldPreventExit } = steps[activeStepIndex];
    const { shouldPreventEnter } = steps[newStepIndex];
    if (
      shouldPreventStepChange(activeStepIndex, newStepIndex) ||
      (shouldPreventExit && shouldPreventExit(newStepIndex)) ||
      (shouldPreventEnter && shouldPreventEnter(activeStepIndex))
    )
      return;
    this.setState({ activeStepIndex: newStepIndex });
  }

  render() {
    const { shouldDisableNextStep, steps, ...otherProps } = this.props;
    const { activeStepIndex } = this.state;
    return (
      <WizardPattern
        nextStepDisabled={shouldDisableNextStep(activeStepIndex)}
        {...otherProps}
        steps={steps.map(step => {
          const {
            shouldPreventEnter,
            shouldPreventExit,
            ...otherStepProps
          } = step;
          return otherStepProps;
        })}
        activeStepIndex={activeStepIndex} // Value from state, as set by getDerivedStateFromProps
        onStepChanged={this.onStepChanged}
      />
    );
  }
}

StatefulWizardPattern.propTypes = {
  ...WizardPattern.propTypes,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      ...wizardStepShape,
      shouldPreventEnter: PropTypes.func,
      shouldPreventExit: PropTypes.func
    })
  ),
  shouldDisableNextStep: PropTypes.func,
  shouldPreventStepChange: PropTypes.func
};

StatefulWizardPattern.defaultProps = {
  ...WizardPattern.defaultProps,
  shouldDisableNextStep: () => false,
  shouldPreventStepChange: () => false
};

polyfill(StatefulWizardPattern);

export default StatefulWizardPattern;
