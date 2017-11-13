import React from 'react'
import { Button, Modal } from '../../index'
import CustomModalDialog from '../CustomModalDialog'
import logo from 'patternfly/dist/img/logo-alt.svg'

export class MockAboutModalManager extends React.Component {
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
          Launch about modal
        </Button>

        <Modal
          dialogComponentClass={CustomModalDialog}
          contentClassName="about-modal-pf"
          bsClass="modal"
          show={this.state.showModal}
          onHide={this.close}
        >
          <Modal.Header>
            <button
              className="close"
              onClick={this.close}
              aria-hidden="true"
              aria-label="Close"
            >
              <span className="pficon pficon-close" />
            </button>
          </Modal.Header>
          <Modal.Body>
            <h1>Product Title</h1>
            <div className="product-versions-pf">
              <ul className="list-unstyled">
                <li>
                  <strong>Label</strong> Version
                </li>
                <li>
                  <strong>Label</strong> Version
                </li>
                <li>
                  <strong>Label</strong> Version
                </li>
                <li>
                  <strong>Label</strong> Version
                </li>
                <li>
                  <strong>Label</strong> Version
                </li>
                <li>
                  <strong>Label</strong> Version
                </li>
              </ul>
            </div>
            <div className="trademark-pf">
              Trademark and Copyright Information
            </div>
          </Modal.Body>
          <Modal.Footer>
            <img src={logo} alt="Patternfly Logo" />
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
