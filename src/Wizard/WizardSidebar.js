import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { ListGroup, ListGroupItem } from '../index.js'

/**
 * WizardSidebar component for Patternfly React
 */
export const WizardSidebar = ({ items, className, ...rest }) => {
  const classes = cx('wizard-pf-sidebar', className)
  return (
    <div className={classes} {...rest}>
      {items}
    </div>
  )
}
WizardSidebar.propTypes = {
  /** Wizard sidebar items */
  items: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string
}

/**
 * WizardSidebarGroup component for Patternfly React
 */
export const WizardSidebarGroup = ({
  children,
  className,
  step,
  activeStep,
  ...rest
}) => {
  const classes = cx({ hidden: step !== activeStep }, className)
  return (
    <ListGroup componentClass="ul" className={classes} {...rest}>
      {children}
    </ListGroup>
  )
}
WizardSidebarGroup.propTypes = {
  /** Children nodes */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string,
  /** The wizard step number for this step */
  step: PropTypes.string,
  /** The active step */
  activeStep: PropTypes.string
}

/**
 * WizardSidebarGroupItem component for Patternfly React
 */
export const WizardSidebarGroupItem = ({
  stepIndex,
  subStepIndex,
  className,
  subStep,
  label,
  title,
  activeSubStep,
  onClick,
  ...rest
}) => {
  const classes = cx({ active: subStep === activeSubStep }, className)
  return (
    <ListGroupItem className={classes} listItem {...rest}>
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          onClick(stepIndex, subStepIndex)
        }}
      >
        <span className="wizard-pf-substep-number">{label}</span>
        <span className="wizard-pf-substep-title">{title}</span>
      </a>
    </ListGroupItem>
  )
}
WizardSidebarGroupItem.propTypes = {
  /** The wizard parent step index */
  stepIndex: PropTypes.number,
  /** The wizard sub step index */
  subStepIndex: PropTypes.number,
  /** Additional css classes */
  className: PropTypes.string,
  /** This wizard sub step name */
  subStep: PropTypes.string,
  /** This wizard sub step label */
  label: PropTypes.string,
  /** This wizard sub step title */
  title: PropTypes.string,
  /** The currently active wizard substep */
  activeSubStep: PropTypes.string,
  /** Sidebar group item click handler */
  onClick: PropTypes.func
}
