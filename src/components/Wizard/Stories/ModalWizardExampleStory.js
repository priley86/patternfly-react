import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { inlineTemplate } from '../../../../storybook/decorators/storyTemplates';
import { Row, Col } from '../../../index';
import { DOCUMENTATION_URL } from '../../../../storybook/constants';

import {
  ModalWizardExample,
  modalWizardExampleSource
} from './ModalWizardExample';

import { mockWizardItems } from './mockWizardItems';

/**
 * ModalWizardExample stories
 */

const modalWizardExampleWithInfo = stories => {
  stories.add(
    'Modal wizard example',
    withInfo({
      source: false,
      propTablesExclude: [Row, Col, ModalWizardExample],
      text: (
        <div>
          <h1>Story Source</h1>
          <pre>{modalWizardExampleSource}</pre>
        </div>
      )
    })(() => {
      const story = (
        <Row>
          <Col sm={12}>
            <ModalWizardExample steps={mockWizardItems} />
          </Col>
        </Row>
      );
      return inlineTemplate({
        title: 'Modal Wizard Example',
        description:
          'The modal wizard example contains base wizard components within a modal wizard.',
        documentationLink: `${
          DOCUMENTATION_URL.PATTERNFLY_ORG_COMMUNICATION
        }wizard/#overview`,
        story
      });
    })
  );
};

export default modalWizardExampleWithInfo;
