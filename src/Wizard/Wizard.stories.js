import React from 'react'
import { storiesOf } from '@storybook/react'
import { Row, Col } from 'react-bootstrap'
import { withKnobs } from '@storybook/addon-knobs'
import { defaultTemplate } from '../../storybook/decorators/storyTemplates'

import { Button, Wizard } from '../index'

import { MockWizardManager } from './__mocks__/mockWizardManager'

import {
  mockLoadingContents,
  mockWizardItems
} from './__mocks__/mockWizardItems'

import {
  renderWizardSteps,
  renderSidebarItems,
  renderWizardContents
} from './__mocks__/mockWizardRenderers'

const stories = storiesOf('Wizard', module)
stories.addDecorator(withKnobs)
stories.addDecorator(
  defaultTemplate({
    title: 'Wizard',
    documentationLink:
      'http://www.patternfly.org/pattern-library/communication/wizard/#/overview'
  })
)

stories.addWithInfo('Loading', `Wizard loading screen.`, () => {
  return (
    <Row>
      <Col sm={12}>
        <Wizard
          className="wizard-pf"
          render={() => {
            return (
              <div>
                <Wizard.Header title="Wizard Title" />
                <Wizard.Body>
                  <Wizard.Row>
                    <Wizard.Main>{mockLoadingContents()}</Wizard.Main>
                  </Wizard.Row>
                </Wizard.Body>
                <Wizard.Footer>
                  <Button bsStyle="default" className="btn-cancel">
                    Cancel
                  </Button>
                  <Button bsStyle="default" disabled>
                    <span className="i fa fa-angle-left" />Back
                  </Button>
                  <Button bsStyle="primary" disabled>
                    Next<span className="i fa fa-angle-right" />
                  </Button>
                </Wizard.Footer>
              </div>
            )
          }}
        />
      </Col>
    </Row>
  )
})

stories.addWithInfo('Modal wizard', `Wizard within a modal.`, () => {
  return (
    <Row>
      <Col sm={12}>
        <MockWizardManager />
      </Col>
    </Row>
  )
})

stories.addWithInfo('Embedded in page', `Wizard embedded in page.`, () => {
  return (
    <Row>
      <Col sm={12}>
        <Wizard
          className="wizard-pf"
          steps={mockWizardItems}
          initialStepIndex={0}
          initialSubStepIndex={0}
          render={(
            { activeStepIndex, activeSubStepIndex },
            onStepClick,
            onSidebarItemClick,
            onBackButtonClick,
            onNextButtonClick
          ) => {
            return (
              <div>
                <Wizard.Header title="Wizard Title" />
                <Wizard.Body>
                  <Wizard.Steps
                    steps={renderWizardSteps(
                      mockWizardItems,
                      activeStepIndex,
                      activeSubStepIndex,
                      onStepClick
                    )}
                  />
                  <Wizard.Row>
                    <Wizard.Sidebar
                      items={renderSidebarItems(
                        mockWizardItems,
                        activeStepIndex,
                        activeSubStepIndex,
                        onSidebarItemClick
                      )}
                    />
                    <Wizard.Main>
                      {renderWizardContents(
                        mockWizardItems,
                        activeStepIndex,
                        activeSubStepIndex
                      )}
                    </Wizard.Main>
                  </Wizard.Row>
                </Wizard.Body>
                <Wizard.Footer>
                  <Button bsStyle="default" className="btn-cancel">
                    Cancel
                  </Button>
                  <Button
                    bsStyle="default"
                    disabled={activeStepIndex === 0 && activeSubStepIndex === 0}
                    onClick={onBackButtonClick}
                  >
                    <span className="i fa fa-angle-left" />Back
                  </Button>
                  {(activeStepIndex === 0 || activeStepIndex === 1) && (
                    <Button bsStyle="primary" onClick={onNextButtonClick}>
                      Next<span className="i fa fa-angle-right" />
                    </Button>
                  )}
                  {activeStepIndex === 2 &&
                    activeSubStepIndex === 0 && (
                      <Button bsStyle="primary" onClick={onNextButtonClick}>
                        Deploy<span className="i fa fa-angle-right" />
                      </Button>
                    )}
                  {activeStepIndex === 2 &&
                    activeSubStepIndex === 1 && (
                      <Button bsStyle="primary">
                        Done<span className="i fa fa-angle-right" />
                      </Button>
                    )}
                </Wizard.Footer>
              </div>
            )
          }}
        />
      </Col>
    </Row>
  )
})
