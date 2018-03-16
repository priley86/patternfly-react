import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { defaultTemplate } from '../../../storybook/decorators/storyTemplates';

import { WizardPattern } from '../../index';

import {
  WizardPatternExample,
  wizardPatternExampleSource,
  statefulWizardPatternExampleSource
} from './__mocks__/wizardPatternExample';

const stories = storiesOf('Wizard Pattern', module);

stories.addDecorator(
  defaultTemplate({
    title: 'Wizard Pattern',
    documentationLink:
      'http://www.patternfly.org/pattern-library/communication/wizard/'
  })
);

stories.add(
  'WizardPattern',
  withInfo({
    source: false,
    propTables: [WizardPattern],
    propTablesExclude: [WizardPatternExample],
    text: (
      <div>
        <p>
          Basic example of Modal Wizard usage with no custom validation behavior
          in stateless mode.
        </p>
        <h1>Story Source</h1>
        <pre>{wizardPatternExampleSource}</pre>
      </div>
    )
  })(() => <WizardPatternExample />)
);

stories.add(
  'StatefulWizardPattern',
  withInfo({
    source: false,
    propTables: [WizardPattern],
    propTablesExclude: [WizardPatternExample],
    text: (
      <div>
        <p>
          Basic example of Modal Wizard usage with no custom validation behavior
          in stateful mode.
        </p>
        <h1>Story Source</h1>
        <pre>{statefulWizardPatternExampleSource}</pre>
      </div>
    )
  })(() => <WizardPatternExample stateful />)
);

// TODO add some knobs for the stateless example instead of state in storybook?
