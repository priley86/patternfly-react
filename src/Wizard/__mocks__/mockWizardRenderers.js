import React from 'react'
import { Wizard } from '../../index'
import {
  mockWizardFormContents,
  MockWizardDeployContents
} from './mockWizardItems'

export const renderWizardSteps = (
  wizardSteps,
  activeStepIndex,
  activeSubStepIndex,
  onStepClick
) => {
  const activeStep = wizardSteps[activeStepIndex] || null
  const activeSubStep =
    (activeStep &&
      activeStep.subSteps &&
      activeStep.subSteps[activeSubStepIndex]) ||
    null

  return wizardSteps.map((step, stepIndex) => {
    return (
      <Wizard.Step
        key={stepIndex}
        stepIndex={stepIndex}
        step={step.step}
        label={step.label}
        title={step.title}
        activeStep={activeStep && activeStep.step}
        onClick={onStepClick}
      >
        {step.subSteps.map((sub, subStepIndex) => {
          return (
            <Wizard.SubStep
              key={subStepIndex}
              subStep={sub.subStep}
              title={sub.title}
              activeSubStep={activeSubStep && activeSubStep.subStep}
            />
          )
        })}
      </Wizard.Step>
    )
  })
}

export const renderSidebarItems = (
  wizardSteps,
  activeStepIndex,
  activeSubStepIndex,
  onSidebarItemClick
) => {
  const activeStep = wizardSteps[activeStepIndex] || null
  const activeSubStep =
    (activeStep &&
      activeStep.subSteps &&
      activeStep.subSteps[activeSubStepIndex]) ||
    null

  return wizardSteps.map((step, stepIndex) => {
    return (
      <Wizard.SidebarGroup
        key={stepIndex}
        step={step.step}
        activeStep={activeStep && activeStep.step}
      >
        {step.subSteps.map((sub, subStepIndex) => {
          return (
            <Wizard.SidebarGroupItem
              key={subStepIndex}
              stepIndex={stepIndex}
              subStepIndex={subStepIndex}
              subStep={sub.subStep}
              label={sub.label}
              title={sub.title}
              activeSubStep={activeSubStep && activeSubStep.subStep}
              onClick={onSidebarItemClick}
            />
          )
        })}
      </Wizard.SidebarGroup>
    )
  })
}

export const renderWizardContents = (
  wizardSteps,
  activeStepIndex,
  activeSubStepIndex
) => {
  return wizardSteps.map((step, stepIndex) => {
    return step.subSteps.map((sub, subStepIndex) => {
      if (stepIndex === 0 || stepIndex === 1) {
        // render steps 1 and 2 mock contents
        return (
          <Wizard.Contents
            key={subStepIndex}
            stepIndex={stepIndex}
            subStepIndex={subStepIndex}
            activeStepIndex={activeStepIndex}
            activeSubStepIndex={activeSubStepIndex}
          >
            {mockWizardFormContents(sub.contents.label1, sub.contents.label2)}
          </Wizard.Contents>
        )
      } else if (stepIndex === 2 && subStepIndex === 0) {
        // todo: render mock summary
      } else if (stepIndex === 2 && subStepIndex === 1) {
        // render mock progress
        return (
          <Wizard.Contents
            key={subStepIndex}
            stepIndex={stepIndex}
            subStepIndex={subStepIndex}
            activeStepIndex={activeStepIndex}
            activeSubStepIndex={activeSubStepIndex}
          >
            <MockWizardDeployContents
              active={
                stepIndex === activeStepIndex &&
                subStepIndex === activeSubStepIndex
              }
            />
          </Wizard.Contents>
        )
      }
    })
  })
}
