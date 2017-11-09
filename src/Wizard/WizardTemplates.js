import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

/**
 * WizardHeader component for Patternfly React
 */
export const WizardHeader = ({ children, className, title, ...rest }) => {
  const classes = cx('wizard-pf-header', className)
  return (
    <div className={classes} {...rest}>
      <h4 className="wizard-pf-title">{title}</h4>
      {children}
    </div>
  )
}
WizardHeader.propTypes = {
  /** Children nodes  */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string,
  /** The wizard title */
  title: PropTypes.string
}

/**
 * WizardBody component for Patternfly React
 */
export const WizardBody = ({ children, className, ...rest }) => {
  const classes = cx('wizard-pf-body', className)
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
WizardBody.propTypes = {
  /** Children nodes  */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string
}

/**
 * WizardFooter component for Patternfly React
 */
export const WizardFooter = ({ children, className, ...rest }) => {
  const classes = cx('wizard-pf-footer', className)
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
WizardFooter.propTypes = {
  /** Children nodes  */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string
}

/**
 * WizardRow component for Patternfly React
 */
export const WizardRow = ({ children, className, ...rest }) => {
  const classes = cx('wizard-pf-row', className)
  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  )
}
WizardRow.propTypes = {
  /** Children nodes  */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string
}

/**
 * WizardMain component for Patternfly React
 */
export const WizardMain = ({ children, className, ...rest }) => {
  const classes = cx('wizard-pf-main', className)
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
WizardMain.propTypes = {
  /** WizardStep nodes */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string
}

/**
 * WizardContents component for Patternfly React
 */
export const WizardContents = ({
  children,
  className,
  stepIndex,
  subStepIndex,
  activeStepIndex,
  activeSubStepIndex,
  ...rest
}) => {
  const classes = cx(
    'wizard-pf-contents',
    {
      // hide contents if the step is not active
      // OR if we have sub steps and this sub step is not active
      hidden:
        activeStepIndex !== stepIndex ||
        (activeSubStepIndex !== null && activeSubStepIndex !== subStepIndex)
    },
    className
  )
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
WizardContents.propTypes = {
  /** WizardStep nodes */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string,
  /** The wizard step index for these contents */
  stepIndex: PropTypes.number,
  /** The wizard sub step index for these contents */
  subStepIndex: PropTypes.number,
  /** The active wizard step index */
  activeStepIndex: PropTypes.number,
  /** The active wizard sub step index */
  activeSubStepIndex: PropTypes.number
}
