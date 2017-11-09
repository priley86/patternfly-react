import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

/**
 * WizardSteps component for Patternfly React
 */
export const WizardSteps = ({ steps, className, ...rest }) => {
  const classes = cx('wizard-pf-steps', className)
  return (
    <div className={classes} {...rest}>
      <ul className="wizard-pf-steps-indicator">{steps}</ul>
    </div>
  )
}
WizardSteps.propTypes = {
  /** WizardStep nodes */
  steps: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string
}

/**
 * WizardStep component for Patternfly React
 */
export const WizardStep = ({
  children,
  className,
  stepIndex,
  step,
  label,
  title,
  activeStep,
  onClick,
  ...rest
}) => {
  const classes = cx(
    'wizard-pf-step',
    { active: step === activeStep },
    className
  )
  return (
    <li className={classes} {...rest}>
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          onClick(stepIndex)
        }}
      >
        <span className="wizard-pf-step-number">{label}</span>
        <span className="wizard-pf-step-title">{title}</span>
        {children}
      </a>
    </li>
  )
}
WizardStep.propTypes = {
  /** Children nodes */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string,
  /** The wizard step index */
  stepIndex: PropTypes.number,
  /** The wizard step for this step */
  step: PropTypes.string,
  /** The wizard step number label */
  label: PropTypes.string,
  /** The wizard step title */
  title: PropTypes.string,
  /** The active step */
  activeStep: PropTypes.string,
  /** Step click handler */
  onClick: PropTypes.func
}

/**
 * WizardSubStep component for Patternfly React
 */
export const WizardSubStep = ({
  className,
  subStep,
  title,
  activeSubStep,
  ...rest
}) => {
  const classes = cx(
    'wizard-pf-step-title-substep',
    { active: subStep === activeSubStep },
    className
  )
  return (
    <span className={classes} {...rest}>
      {title}
    </span>
  )
}
WizardSubStep.propTypes = {
  /** Additional css classes */
  className: PropTypes.string,
  /** The wizard sub step for this step */
  subStep: PropTypes.string,
  /** The wizard sub step title */
  title: PropTypes.string,
  /** The active step */
  activeSubStep: PropTypes.string
}
