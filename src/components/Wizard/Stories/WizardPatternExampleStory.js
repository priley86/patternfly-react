import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { inlineTemplate } from '../../../../storybook/decorators/storyTemplates';
import { Row, Col } from '../../../index';
import { DOCUMENTATION_URL } from '../../../../storybook/constants';

import {
  WizardPatternExample,
  wizardPatternExampleSource
} from './WizardPatternExample';

/**
 * Wizard Pattern stories
 */

const wizardPatternExampleAddWithInfo = stories => {
  stories.addDecorator(withKnobs);
  stories.add(
    'Modal wizard pattern example',
    withInfo({
      source: false,
      propTablesExclude: [Row, Col, WizardPatternExample],
      text: (
        <div>
          <h1>Story Source</h1>
          <pre>{wizardPatternExampleSource}</pre>
        </div>
      )
    })(() => {
      const story = (
        <Row>
          <Col sm={12}>
            <WizardPatternExample
              stateful={boolean('Stateful', false)}
              activeStepIndex={number('Stateful Active Step Index', 0)}
            />
          </Col>
        </Row>
      );
      return inlineTemplate({
        title: 'Modal Wizard Pattern Example',
        description:
          'The modal wizard pattern example contains WizardPattern and StatefulWizardPattern components.',
        documentationLink: `${
          DOCUMENTATION_URL.PATTERNFLY_ORG_COMMUNICATION
        }wizard/#overview`,
        story
      });
    })
  );
};

export default wizardPatternExampleAddWithInfo;
