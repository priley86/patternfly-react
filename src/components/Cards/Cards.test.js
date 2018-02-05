import React from 'react';
import renderer from 'react-test-renderer';
import { Card, CardLink, CardDropdownButton } from './index';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { MenuItem } from '../MenuItem';

test('Card Title is working properly', () => {
  const component = renderer.create(
    <Card className="some-class">
      <Card.Title>Card Title</Card.Title>
    </Card>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card Footer is working properly', () => {
  const component = renderer.create(
    <Card>
      <Card.Footer>This is a Card Footer</Card.Footer>
    </Card>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card Container is working properly', () => {
  const component = renderer.create(
    <Card>
      <Card.Container />
    </Card>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card Header is working properly', () => {
  const component = renderer.create(
    <Card>
      <Card.Heading>
        <div className="dropdown card-pf-time-frame-filter">
          <Button>
            Button
            <span className="caret" />
          </Button>
        </div>
      </Card.Heading>
    </Card>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card Body is working properly', () => {
  const component = renderer.create(
    <Card>
      <Card.Body>This is a Card Body</Card.Body>
    </Card>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card Link is working properly', () => {
  const component = renderer.create(
    <CardLink href={'https://github.com/patternfly/patternfly-react/pull/203'}>
      <Icon type="pf" name="add-circle-o" /> Add New Cluster
    </CardLink>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card Drop Down Button is working properly', () => {
  const component = renderer.create(
    <Card>
      <CardDropdownButton
        id="cardDropdownButton1"
        title="Last 30 Days"
        onClick={jest.fn()}
      >
        <MenuItem eventKey="1" active>
          Last 30 Days
        </MenuItem>
        <MenuItem eventKey="2">Last 60 Days</MenuItem>
        <MenuItem eventKey="3">Last 90 Days</MenuItem>
      </CardDropdownButton>
    </Card>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
