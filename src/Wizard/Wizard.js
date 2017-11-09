import React from 'react'
import PropTypes from 'prop-types'

import {
  WizardHeader,
  WizardBody,
  WizardFooter,
  WizardRow,
  WizardMain,
  WizardContents
} from './WizardTemplates'

import { WizardSubStep, WizardStep, WizardSteps } from './WizardSteps'

import {
  WizardSidebar,
  WizardSidebarGroup,
  WizardSidebarGroupItem
} from './WizardSidebar'

/**
 * Wizard - main Wizard component which handles the wizard step logic.
 */
export default class Wizard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStepIndex: props.initialStepIndex || 0,
      activeSubStepIndex: props.initialSubStepIndex || 0
    }
    this.onSidebarItemClick = this.onSidebarItemClick.bind(this)
    this.onStepClick = this.onStepClick.bind(this)
    this.onNextButtonClick = this.onNextButtonClick.bind(this)
    this.onBackButtonClick = this.onBackButtonClick.bind(this)
  }
  onSidebarItemClick(stepIndex, subStepIndex) {
    this.setState({
      activeStepIndex: stepIndex,
      activeSubStepIndex: subStepIndex
    })
  }
  onStepClick(stepIndex) {
    this.setState({
      activeStepIndex: stepIndex,
      activeSubStepIndex: 0
    })
  }
  onNextButtonClick() {
    const { steps } = this.props
    const { activeStepIndex, activeSubStepIndex } = this.state
    const activeStep = steps[activeStepIndex]

    if (activeSubStepIndex < activeStep.subSteps.length - 1) {
      this.setState(prevState => ({
        activeSubStepIndex: prevState.activeSubStepIndex + 1
      }))
    } else if (activeStepIndex < steps.length - 1) {
      this.setState(prevState => ({
        activeStepIndex: prevState.activeStepIndex + 1,
        activeSubStepIndex: 0
      }))
    }
  }
  onBackButtonClick() {
    const { steps } = this.props
    const { activeStepIndex, activeSubStepIndex } = this.state

    if (activeSubStepIndex > 0) {
      this.setState(prevState => ({
        activeSubStepIndex: prevState.activeSubStepIndex - 1
      }))
    } else if (activeStepIndex > 0) {
      this.setState(prevState => ({
        activeStepIndex: prevState.activeStepIndex - 1,
        activeSubStepIndex:
          steps[prevState.activeStepIndex - 1].subSteps.length - 1
      }))
    }
  }

  render() {
    const {
      className,
      render,
      initialStepIndex,
      initialSubStepIndex,
      ...rest
    } = this.props

    return (
      <div className={className} {...rest}>
        {render(
          this.state,
          this.onStepClick,
          this.onSidebarItemClick,
          this.onBackButtonClick,
          this.onNextButtonClick
        )}
      </div>
    )
  }
}
Wizard.propTypes = {
  /** Additional css classes */
  className: PropTypes.string,
  /** Wizard steps array */
  steps: PropTypes.array,
  /** override to initialize the step position */
  initialStepIndex: PropTypes.number,
  /** override to initialize the sub step position */
  initialSubStepIndex: PropTypes.number,
  /** render method */
  render: PropTypes.func.isRequired
}
Wizard.Header = WizardHeader
Wizard.Body = WizardBody
Wizard.Row = WizardRow
Wizard.Main = WizardMain
Wizard.Contents = WizardContents
Wizard.Footer = WizardFooter
Wizard.Steps = WizardSteps
Wizard.Step = WizardStep
Wizard.SubStep = WizardSubStep
Wizard.Sidebar = WizardSidebar
Wizard.SidebarGroup = WizardSidebarGroup
Wizard.SidebarGroupItem = WizardSidebarGroupItem
