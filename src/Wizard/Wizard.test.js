import React from 'react'
import renderer from 'react-test-renderer'
import { Row, Col } from 'react-bootstrap'

import { Button, Wizard } from '../index'

import {
  mockWizardItems,
  mockLoadingContents
} from './__mocks__/mockWizardItems'

import {
  renderWizardSteps,
  renderSidebarItems,
  renderWizardContents
} from './__mocks__/mockWizardRenderers'

test('Wizard loading renders properly', () => {
  const component = renderer.create(
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

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Wizard embedded renders properly', () => {
  const component = renderer.create(
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

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

/**
 * react-overlays / Jest opened issue
 * Open issue: https://github.com/react-bootstrap/react-overlays/issues/225
 */
// test('Wizard modal renders properly', () => {
//   const showModal = true
//   const handleClose = jest.fn()

//   const component = renderer.create(
//     <div>
//       <Modal
//         show={showModal}
//         onHide={handleClose}
//         dialogClassName="modal-lg wizard-pf"
//       >
//         <Wizard
//           steps={mockWizardItems}
//           initialStepIndex={0}
//           initialSubStepIndex={0}
//           render={(
//             { activeStepIndex, activeSubStepIndex },
//             onStepClick,
//             onSidebarItemClick,
//             onBackButtonClick,
//             onNextButtonClick
//           ) => {
//             return (
//               <div>
//                 <Modal.Header>
//                   <button
//                     className="close"
//                     onClick={handleClose}
//                     aria-hidden="true"
//                     aria-label="Close"
//                   >
//                     <span className="pficon pficon-close" />
//                   </button>
//                   <Modal.Title>Wizard Title</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body className="wizard-pf-body clearfix">
//                   <Wizard.Steps
//                     steps={renderWizardSteps(
//                       mockWizardItems,
//                       activeStepIndex,
//                       activeSubStepIndex,
//                       onStepClick
//                     )}
//                   />
//                   <Wizard.Row>
//                     <Wizard.Sidebar
//                       items={renderSidebarItems(
//                         mockWizardItems,
//                         activeStepIndex,
//                         activeSubStepIndex,
//                         onSidebarItemClick
//                       )}
//                     />
//                     <Wizard.Main>
//                       {renderWizardContents(
//                         mockWizardItems,
//                         activeStepIndex,
//                         activeSubStepIndex
//                       )}
//                     </Wizard.Main>
//                   </Wizard.Row>
//                 </Modal.Body>
//                 <Modal.Footer className="wizard-pf-footer">
//                   <Button
//                     bsStyle="default"
//                     className="btn-cancel"
//                     onClick={handleClose}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     bsStyle="default"
//                     disabled={activeStepIndex === 0 && activeSubStepIndex === 0}
//                     onClick={onBackButtonClick}
//                   >
//                     <span className="i fa fa-angle-left" />Back
//                   </Button>
//                   {(activeStepIndex === 0 || activeStepIndex === 1) && (
//                     <Button bsStyle="primary" onClick={onNextButtonClick}>
//                       Next<span className="i fa fa-angle-right" />
//                     </Button>
//                   )}
//                   {activeStepIndex === 2 &&
//                     activeSubStepIndex === 0 && (
//                       <Button bsStyle="primary" onClick={onNextButtonClick}>
//                         Deploy<span className="i fa fa-angle-right" />
//                       </Button>
//                     )}
//                   {activeStepIndex === 2 &&
//                     activeSubStepIndex === 1 && (
//                       <Button bsStyle="primary" onClick={handleClose}>
//                         Close<span className="i fa fa-angle-right" />
//                       </Button>
//                     )}
//                 </Modal.Footer>
//               </div>
//             )
//           }}
//         />
//       </Modal>
//     </div>
//   )

//   const tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
// })
