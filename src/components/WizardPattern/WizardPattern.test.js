import React from 'react';
import renderer from 'react-test-renderer';
import { noop } from '../../common/helpers';
import { WizardPattern } from '../../index';

test('WizardPattern renders correctly when hidden', () => {
  const component = renderer.create(
    <WizardPattern show={false} onHide={noop} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/** TODO: requires https://github.com/react-bootstrap/react-overlays/issues/225
test('AboutModal renders correctly when shown', () => {
  const component = renderer.create(
    <WizardPattern
      show
      onHide={noop}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
*/
