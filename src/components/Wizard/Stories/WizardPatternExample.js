import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../Button';
import { bindMethods, Wizard } from '../../../index';

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
      wizardLoading: false,
      activeStepIndex: 0
    };
    bindMethods(this, ['close', 'open', 'renderStateless', 'renderStateful']);
  }
  close() {
    this.setState({ showModal: false, wizardLoading: false });
  }
  open() {
    this.setState({ showModal: true, wizardLoading: true });
    setTimeout(() => {
      this.setState({ wizardLoading: false });
    }, 1000);
  }
  renderStateless() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Launch Stateless Wizard
        </Button>

        <Wizard.Pattern
          show={this.state.showModal}
          onHide={this.close}
          onExited={this.close}
          title="Statless Wizard Pattern Example"
          nextStepDisabled={false}
          steps={wizardSteps}
          loadingTitle="Loading..."
          loadingMessage="This may take a minute."
          loading={this.state.wizardLoading}
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
          Launch Stateful Wizard
        </Button>

        <Wizard.Pattern.Stateful
          activeStepIndex={this.props.activeStepIndex}
          show={this.state.showModal}
          onHide={this.close}
          onExited={this.close}
          title="Stateful Wizard Pattern Example"
          shouldDisableNextStep={activeStepIndex => false}
          steps={wizardSteps}
          loadingTitle="Loading..."
          loadingMessage="This may take a minute."
          loading={this.state.wizardLoading}
        />
      </div>
    );
  }
  render() {
    return this.props.stateful ? this.renderStateful() : this.renderStateless();
  }
}

WizardPatternExample.propTypes = {
  stateful: PropTypes.bool,
  activeStepIndex: PropTypes.number
};

WizardPatternExample.defaultProps = {
  stateful: false,
  activeStepIndex: 0
};

export const wizardPatternExampleSource = `
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
      wizardLoading: false,
      activeStepIndex: 0
    };
    bindMethods(this, ['close', 'open', 'renderStateless', 'renderStateful']);
  }
  close() {
    this.setState({ showModal: false, wizardLoading: false });
  }
  open() {
    this.setState({ showModal: true, wizardLoading: true });
    setTimeout(() => {
      this.setState({ wizardLoading: false });
    }, 1000);
  }
  renderStateless() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Launch Stateless Wizard
        </Button>

        <Wizard.Pattern
          show={this.state.showModal}
          onHide={this.close}
          onExited={this.close}
          title="Statless Wizard Pattern Example"
          nextStepDisabled={false}
          steps={wizardSteps}
          loadingTitle="Loading..."
          loadingMessage="This may take a minute."
          loading={this.state.wizardLoading}
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
          Launch Stateful Wizard
        </Button>

        <Wizard.Pattern.Stateful
          activeStepIndex={this.props.activeStepIndex}
          show={this.state.showModal}
          onHide={this.close}
          onExited={this.close}
          title="Stateful Wizard Pattern Example"
          shouldDisableNextStep={activeStepIndex => false}
          steps={wizardSteps}
          loadingTitle="Loading..."
          loadingMessage="This may take a minute."
          loading={this.state.wizardLoading}
        />
      </div>
    );
  }
  render() {
    return this.props.stateful ? this.renderStateful() : this.renderStateless();
  }
}
`;
