import React from 'react'
import { Button, Modal } from '../../index'

export class MockModalManager extends React.Component {
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
          Launch demo modal
        </Button>

        <Modal
          contentClassName={'about-modal-pf'}
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
            <Modal.Title>Modal Overlay Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal">
              <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="textInput">
                  Field One
                </label>
                <div className="col-sm-9">
                  <input type="text" id="textInput" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="textInput2">
                  Field Two
                </label>
                <div className="col-sm-9">
                  <input type="text" id="textInput2" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="textInput3">
                  Field Three
                </label>
                <div className="col-sm-9">
                  <input type="text" id="textInput3" className="form-control" />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="default"
              className="btn-cancel"
              onClick={this.close}
            >
              Cancel
            </Button>
            <Button bsStyle="primary" onClick={this.close}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
