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
  const onStepClick = jest.fn();

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
              onClick={onStepClick}
            >
              <Wizard.SubStep key={0} subStep="1.1" title="Step 1.1" />
            </Wizard.Step>
          ]}
        />
      </Wizard.Body>
    </Wizard>
  );

  expect(component.render()).toMatchSnapshot();
});

test('Wizard sidebar renders properly', () => {
  const onSidebarItemClick = jest.fn();
  const component = mount(
    <Wizard>
      <Wizard.Header title="Wizard Title" />
      <Wizard.Body>
        <Wizard.Row>
          <Wizard.Sidebar
            items={[
              <Wizard.SidebarGroup key="1" step="1" activeStep="1">
                <Wizard.SidebarGroupItem
                  key="1.1"
                  stepIndex={1}
                  subStepIndex={1}
                  subStep="1.1"
                  label="1A."
                  title="Details"
                  activeSubStep="1.1"
                  onClick={onSidebarItemClick}
                />
              </Wizard.SidebarGroup>
            ]}
          />
        </Wizard.Row>
      </Wizard.Body>
    </Wizard>
  );

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

test('Wizard Pattern renders properly', () => {
  const onHide = jest.fn();
  const onExited = jest.fn();
  const onStepChanged = jest.fn();
  const component = mount(
    <Wizard.Pattern
      show
      onHide={onHide}
      onExited={onExited}
      title="Wizard Pattern Example"
      shouldDisableNextStep={false}
      steps={[{ title: 'General', render: () => <p>General</p> }]}
      loadingTitle="Loading..."
      loadingMessage="This may take a minute."
      loading
      activeStepIndex={0}
      onStepChanged={onStepChanged}
    />
  );

  expect(component.render()).toMatchSnapshot();
});

test('Wizard Stateful Pattern renders properly', () => {
  const onHide = jest.fn();
  const onExited = jest.fn();
  const component = mount(
    <Wizard.Pattern.Stateful
      show
      activeStepIndex={0}
      onHide={onHide}
      onExited={onExited}
      title="Wizard Pattern Stateful Example"
      shouldDisableNextStep={() => false}
      shouldPreventStepChange={() => false}
      steps={[{ title: 'General', render: () => <p>General</p> }]}
      loadingTitle="Loading..."
      loadingMessage="This may take a minute."
      loading
    />
  );

  expect(component.render()).toMatchSnapshot();
});
