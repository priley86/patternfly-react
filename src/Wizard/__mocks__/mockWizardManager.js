import React from 'react'
import { Button, Modal, Wizard } from '../../index'
import { mockWizardItems } from './mockWizardItems'
import {
  renderWizardSteps,
  renderSidebarItems,
  renderWizardContents
} from './mockWizardRenderers'

export class MockWizardManager extends React.Component {
  constructor() {
    super()
    this.state = { showModal: false }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }
  open() {
    this.setState({ showModal: true })
  }
  close() {
    this.setState({ showModal: false })
  }
  render() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Launch modal wizard
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.close}
          dialogClassName="modal-lg wizard-pf"
        >
          <Wizard
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
                  <Modal.Header>
                    <button
                      className="close"
                      onClick={this.close}
                      aria-hidden="true"
                      aria-label="Close"
                    >
                      <span className="pficon pficon-close" />
                    </button>
                    <Modal.Title>Wizard Title</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="wizard-pf-body clearfix">
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
                  </Modal.Body>
                  <Modal.Footer className="wizard-pf-footer">
                    <Button
                      bsStyle="default"
                      className="btn-cancel"
                      onClick={this.close}
                    >
                      Cancel
                    </Button>
                    <Button
                      bsStyle="default"
                      disabled={
                        activeStepIndex === 0 && activeSubStepIndex === 0
                      }
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
                        <Button bsStyle="primary" onClick={this.close}>
                          Close<span className="i fa fa-angle-right" />
                        </Button>
                      )}
                  </Modal.Footer>
                </div>
              )
            }}
          />
        </Modal>
      </div>
    )
  }
}
