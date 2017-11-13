import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { defaultTemplate } from '../../storybook/decorators/storyTemplates'
import { MockModalManager } from './__mocks__/mockModalManager'
import { MockAboutModalManager } from './__mocks__/mockAboutModalManager'

const stories = storiesOf('Modal Overlay', module)

const description = (
  <p>
    This component is based on React Bootstrap Modal component. See{' '}
    <a href="https://react-bootstrap.github.io/components.html#modals">
      React Bootstrap Docs
    </a>{' '}
    for complete Modal component documentation.
  </p>
)

stories.addDecorator(
  defaultTemplate({
    title: 'Modal Overlay',
    documentationLink:
      'http://www.patternfly.org/pattern-library/forms-and-controls/modal-overlay/',
    description: description
  })
)

const basicExampleSource = `
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
        <Button bsStyle="default" className="btn-cancel" onClick={this.close}>
          Cancel
        </Button>
        <Button bsStyle="primary" onClick={this.close}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
`

stories.add(
  'Basic example',
  withInfo({
    source: false,
    propTablesExclude: [MockModalManager],
    text: (
      <div>
        <h1>Story Source</h1>
        <pre>{basicExampleSource}</pre>
      </div>
    )
  })(() => <MockModalManager />)
)

const aboutExampleSource = `
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
        <div className="trademark-pf">Trademark and Copyright Information</div>
      </Modal.Body>
      <Modal.Footer>
        <img src={logo} alt="Patternfly Logo" />
      </Modal.Footer>
    </Modal>
`

stories.add(
  'About Modal',
  withInfo({
    source: false,
    propTablesExclude: [MockAboutModalManager],
    text: (
      <div>
        <h1>Story Source</h1>
        <pre>{aboutExampleSource}</pre>
      </div>
    )
  })(() => <MockAboutModalManager />)
)
