import React from 'react';
import { mount } from 'enzyme';
import { Button, Row, Col, Wizard } from '../../index';

test('Wizard loading renders properly', () => {
  const component = mount(
    <Row>
      <Col sm={12}>
        <Wizard>
          <Wizard.Header title="Wizard Title" />
          <Wizard.Body>
            <Wizard.Row>
              <Wizard.Main>Contents</Wizard.Main>
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
        </Wizard>
      </Col>
    </Row>
  );

  expect(component.render()).toMatchSnapshot();
});

test('Wizard steps renders properly', () => {
  let eventCount = 0;
  const component = mount(
    <Wizard>
      <Wizard.Header title="Wizard Title" />
      <Wizard.Body>
        <Wizard.Steps
          steps={[
            <Wizard.Step
              key={0}
              stepIndex={0}
              step={0}
              label="Step 1"
              title="Step 1"
              onClick={() => eventCount++}
            >
              <Wizard.SubStep key={0} subStep="1.1" title="Step 1.1" />
            </Wizard.Step>
          ]}
        />
      </Wizard.Body>
    </Wizard>
  );

  component
    .find('.wizard-pf-step a')
    .first()
    .simulate('click');

  expect(eventCount).toBe(1);
  expect(component.render()).toMatchSnapshot();
});

test('Wizard sidebar renders properly', () => {
  let eventCount = 0;

  const component = mount(
    <Wizard>
      <Wizard.Header title="Wizard Title" />
      <Wizard.Body>
        <Wizard.Row>
          <Wizard.Sidebar
            items={[
              <Wizard.SidebarGroup key="1" step="1" activeStep="1">
                <Wizard.SidebarGroupItem
                  className="wizard-sidebar-group-item"
                  key="1.1"
                  stepIndex={1}
                  subStepIndex={1}
                  subStep="1.1"
                  label="1A."
                  title="Details"
                  activeSubStep="1.1"
                  onClick={() => eventCount++}
                />
              </Wizard.SidebarGroup>
            ]}
          />
        </Wizard.Row>
      </Wizard.Body>
    </Wizard>
  );

  component
    .find('.wizard-sidebar-group-item a')
    .first()
    .simulate('click');

  expect(eventCount).toBe(1);
  expect(component.render()).toMatchSnapshot();
});

test('Wizard main contents renders properly', () => {
  const component = mount(
    <Wizard>
      <Wizard.Header title="Wizard Title" />
      <Wizard.Body>
        <Wizard.Row>
          <Wizard.Main>
            <Wizard.Contents
              key={0}
              stepIndex={1}
              subStepIndex={1}
              activeStepIndex={1}
              activeSubStepIndex={1}
            >
              Content
            </Wizard.Contents>
          </Wizard.Main>
        </Wizard.Row>
      </Wizard.Body>
    </Wizard>
  );

  expect(component.render()).toMatchSnapshot();
});

test('Wizard review contents renders properly', () => {
  const onStepClicked = jest.fn();
  const onSubStepClicked = jest.fn();
  const component = mount(
    <Wizard>
      <Wizard.Header title="Wizard Title" />
      <Wizard.Body>
        <Wizard.Row>
          <Wizard.Main>
            <Wizard.ReviewSteps>
              <Wizard.ReviewStep
                title="Step 1 Review"
                collapsed
                onClick={onStepClicked}
              >
                <Wizard.ReviewSubSteps collapsed>
                  <Wizard.ReviewSubStep
                    label="Review 1.1"
                    title="Review 1.1"
                    collapsed
                    onClick={onSubStepClicked}
                  >
                    <Wizard.ReviewContent collapsed>
                      <Wizard.ReviewItem>
                        <span className="wizard-pf-review-item-label">
                          {'Step 1.1 Label'}:
                        </span>
                        <span className="wizard-pf-review-item-value">
                          Brian Johnson
                        </span>
                      </Wizard.ReviewItem>
                      <Wizard.ReviewItem>
                        <span className="wizard-pf-review-item-label">
                          {'Step 1.2 Label'}:
                        </span>
                        <span className="wizard-pf-review-item-value">
                          This is the description.
                        </span>
                      </Wizard.ReviewItem>
                    </Wizard.ReviewContent>
                  </Wizard.ReviewSubStep>
                </Wizard.ReviewSubSteps>
              </Wizard.ReviewStep>
            </Wizard.ReviewSteps>
          </Wizard.Main>
        </Wizard.Row>
      </Wizard.Body>
    </Wizard>
  );

  expect(component.render()).toMatchSnapshot();
});

const testWizardPattern = props => {
  const onHide = jest.fn();
  const onExited = jest.fn();
  const onStepChanged = jest.fn();
  return (
    <Wizard.Pattern
      show
      onHide={onHide}
      onExited={onExited}
      title="Wizard Pattern Example"
      shouldDisableNextStep={false}
      steps={[
        { title: 'General', render: () => <p>General</p> },
        { title: 'Step Two', render: () => <p>Step Two</p> },
        { title: 'Step Three', render: () => <p>Step Three</p> }
      ]}
      loadingTitle="Loading..."
      loadingMessage="This may take a minute."
      activeStepIndex={0}
      onStepChanged={onStepChanged}
      {...props}
    />
  );
};

test('Wizard Pattern renders properly while loading', () => {
  const component = mount(testWizardPattern({ loading: true }));
  expect(component.render()).toMatchSnapshot();
});

test('Wizard Pattern renders properly after wizard step click', () => {
  let eventCount = 0;
  const component = mount(
    testWizardPattern({
      onStepChanged: () => eventCount++
    })
  );
  component
    .find('.wizard-pf-step a')
    .at(1)
    .simulate('click');

  expect(eventCount).toBe(1);

  expect(component.render()).toMatchSnapshot();
});

test('Wizard Pattern accepts next step then previous step', () => {
  let eventCount = 0;
  const component = mount(
    testWizardPattern({
      onStepChanged: () => eventCount++
    })
  );

  // click next
  component
    .find('.wizard-pf-footer button')
    .at(2)
    .simulate('click');

  component.setProps({ activeStepIndex: 1 });

  // click previous
  component
    .find('.wizard-pf-footer button')
    .at(1)
    .simulate('click');

  component.setProps({ activeStepIndex: 0 });

  expect(eventCount).toBe(2);
});

test('Wizard Pattern Body renders null without steps', () => {
  const component = mount(<Wizard.Pattern.Body />);

  expect(component.render()).toMatchSnapshot();
});

const testStatefulWizardPattern = props => {
  const onHide = jest.fn();
  const onExited = jest.fn();
  const onStepChanged = jest.fn();
  return (
    <Wizard.Pattern.Stateful
      show
      onHide={onHide}
      onExited={onExited}
      title="Wizard Pattern Stateful Example"
      shouldDisableNextStep={() => false}
      shouldPreventStepChange={() => false}
      steps={[
        { title: 'General', render: () => <p>General</p> },
        { title: 'Step Two', render: () => <p>Step Two</p> },
        { title: 'Step Three', render: () => <p>Step Three</p> }
      ]}
      loadingTitle="Loading..."
      loadingMessage="This may take a minute."
      activeStepIndex={0}
      onStepChanged={onStepChanged}
      {...props}
    />
  );
};

test('Wizard Stateful Pattern renders properly while loading', () => {
  const component = mount(testStatefulWizardPattern({ loading: true }));
  expect(component.state().activeStepIndex).toBe(0);
  expect(component.render()).toMatchSnapshot();
});

test('Wizard Stateful Pattern renders properly after wizard step click', () => {
  const component = mount(testStatefulWizardPattern());
  component
    .find('.wizard-pf-step a')
    .at(1)
    .simulate('click');

  expect(component.state().activeStepIndex).toBe(1);

  expect(component.render()).toMatchSnapshot();
});

test('Wizard Stateful Pattern should return on shouldPreventStepChange', () => {
  const component = mount(
    testStatefulWizardPattern({
      shouldPreventStepChange: (activeStepIndex, newStepIndex) => true
    })
  );
  component
    .find('.wizard-pf-step a')
    .at(1)
    .simulate('click');

  expect(component.state().activeStepIndex).toBe(0);
});
