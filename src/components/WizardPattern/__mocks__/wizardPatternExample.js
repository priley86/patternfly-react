import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../Button';
import { bindMethods, WizardPattern } from '../../../index';

const wizardSteps = [
  {
    title: 'General',
    render: () => <p>(Step 1 Contents Here)</p>
  },
  {
    title: 'Details',
    render: () => <p>(Step 2 Contents Here)</p>
  },
  {
    title: 'Results',
    render: () => <p>(Step 3 Contents Here)</p>
  }
];

export class WizardPatternExample extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      wizardLoaded: false,
      activeStepIndex: 0
    };
    bindMethods(this, ['close', 'open', 'renderStateless', 'renderStateful']);
  }
  close() {
    this.setState({ showModal: false, wizardLoaded: false });
  }
  open() {
    this.setState({ showModal: true });
    setTimeout(() => {
      this.setState({ wizardLoaded: true });
    }, 1000);
  }
  renderStateless() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Launch Stateless Modal Wizard <br />
          (WizardPattern)
        </Button>

        <WizardPattern
          show={this.state.showModal}
          onHide={this.close}
          onExited={this.close}
          title="Modal Wizard Example"
          shouldDisableNextStep={activeStepIndex => false}
          steps={wizardSteps}
          loadingTitle="Loading..."
          loadingMessage="This may take a minute."
          loaded={this.state.wizardLoaded}
          activeStepIndex={this.state.activeStepIndex}
          onStepChanged={activeStepIndex => this.setState({ activeStepIndex })}
        />
      </div>
    );
  }
  renderStateful() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Launch Stateful Modal Wizard <br />
          (StatefulWizardPattern or WizardPattern.Stateful)
        </Button>

        <WizardPattern.Stateful
          show={this.state.showModal}
          onHide={this.close}
          onExited={this.close}
          title="Modal Wizard Example"
          shouldDisableNextStep={activeStepIndex => false}
          steps={wizardSteps}
          loadingTitle="Loading..."
          loadingMessage="This may take a minute."
          loaded={this.state.wizardLoaded}
        />
      </div>
    );
  }
  render() {
    return this.props.stateful ? this.renderStateful() : this.renderStateless();
  }
}

WizardPatternExample.propTypes = {
  stateful: PropTypes.bool
};

WizardPatternExample.defaultProps = {
  stateful: false
};

export const wizardPatternExampleSource = `
  <Button bsStyle="primary" bsSize="large" onClick={this.open}>
    Launch Stateless Modal Wizard <br />
    (WizardPattern)
  </Button>

  <WizardPattern
    show={this.state.showModal}
    onHide={this.close}
    onExited={this.close}
    title="Wizard Pattern Example"
    shouldDisableNextStep={activeStepIndex => false}
    steps={[
      {
        title: 'General',
        render: () => <p>(Step 1 Contents Here)</p>
      },
      {
        title: 'Details',
        render: () => <p>(Step 2 Contents Here)</p>
      },
      {
        title: 'Results',
        render: () => <p>(Step 3 Contents Here)</p>
      }
    ]}
    loadingTitle="Loading..."
    loadingMessage="This may take a minute."
    loaded={this.state.wizardLoaded}
    activeStepIndex={this.state.activeStepIndex}
    onStepChanged={activeStepIndex => this.setState({ activeStepIndex })}
  />
`;

export const statefulWizardPatternExampleSource = `
  <Button bsStyle="primary" bsSize="large" onClick={this.open}>
    Launch Stateful Modal Wizard <br />
    (StatefulWizardPattern or WizardPattern.Stateful)
  </Button>

  <WizardPattern.Stateful
    show={this.state.showModal}
    onHide={this.close}
    onExited={this.close}
    title="Modal Wizard Example"
    shouldDisableNextStep={activeStepIndex => false}
    steps={wizardSteps}
    loadingTitle="Loading..."
    loadingMessage="This may take a minute."
    loaded={this.state.wizardLoaded}
  />
`;
