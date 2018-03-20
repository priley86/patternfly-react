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
    'Wizard pattern example',
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
      const stateful = boolean('Stateful', false);
      const story = (
        <Row>
          <Col sm={12}>
            <WizardPatternExample
              stateful={stateful}
              activeStepIndex={
                stateful && number('Stateful Active Step Index', 0)
              }
            />
          </Col>
        </Row>
      );
      return inlineTemplate({
        title: 'Wizard Pattern Example',
        description: (
          <div>
            The wizard pattern example contains <i>WizardPattern</i> and{' '}
            <i>StatefulWizardPattern</i> pattern components.
            <br />
            <br />
            The <i>WizardPattern</i> is a <b>stateless</b> wizard pattern which
            provides loading contents and some common step handling logic for
            the provided steps.
            <br />
            <br />
            The <i>StatefulWizardPattern</i> is a <b>stateful</b> wizard pattern
            which provides loading contents, step handling logic, and will
            automatically manage the <i>activeStepIndex</i> for the provided
            steps. This can be overriden by passing <i>activeStepIndex</i> as a
            prop.
          </div>
        ),
        documentationLink: `${
          DOCUMENTATION_URL.PATTERNFLY_ORG_COMMUNICATION
        }wizard/#overview`,
        story
      });
    })
  );
};

export default wizardPatternExampleAddWithInfo;
