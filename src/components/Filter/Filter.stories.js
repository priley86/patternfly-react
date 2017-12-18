import React from 'react';
import { storiesOf } from '@storybook/react';
import { defaultTemplate } from '../../../storybook/decorators/storyTemplates';
import { Col, Row } from 'react-bootstrap';
import { withInfo } from '@storybook/addon-info/dist/index';
import {
  Filter,
  FilterTypeSelector,
  FilterValueSelector,
  FilterCategorySelector,
  FilterCategoryValueSelector
} from '../../index';

import {
  MockFilterExample,
  mockFilterExampleSource,
  mockFilterExampleFields
} from './__mocks__/mockFilterExample';

const stories = storiesOf('Filter', module);

stories.addDecorator(
  defaultTemplate({
    title: 'Filter',
    documentationLink:
      'http://www.patternfly.org/pattern-library/forms-and-controls/filter/'
  })
);

stories.addWithInfo(
  'Filter with input Component',
  `Filter input example`,
  () => {
    return (
      <Filter>
        <FilterTypeSelector
          filterTypes={mockFilterExampleFields}
          currentFilterType={mockFilterExampleFields[0]}
        />
        <input
          className="form-control"
          type={mockFilterExampleFields[0].filterType}
          value=""
          placeholder="Filter by Name"
        />
      </Filter>
    );
  }
);

stories.addWithInfo(
  'Filter with FilterValueSelector Component',
  `Filter select example`,
  () => {
    return (
      <Filter>
        <FilterTypeSelector
          filterTypes={mockFilterExampleFields}
          currentFilterType={mockFilterExampleFields[2]}
        />
        <FilterValueSelector
          filterValues={mockFilterExampleFields[2].filterValues}
          currentValue={mockFilterExampleFields[2].filterValues[4]}
        />
      </Filter>
    );
  }
);

stories.addWithInfo(
  'Filter with FilterCategorySelector Components',
  `Filter categories example`,
  () => {
    return (
      <Filter>
        <FilterTypeSelector
          filterTypes={mockFilterExampleFields}
          currentFilterType={mockFilterExampleFields[3]}
        />
        <FilterCategorySelector
          filterCategories={mockFilterExampleFields[3].filterCategories}
          currentCategory={mockFilterExampleFields[3].filterCategories[0]}
          placeholder={mockFilterExampleFields[3].placeholder}
        >
          <FilterCategoryValueSelector
            categoryValues={
              mockFilterExampleFields[3].filterCategories[0].filterValues
            }
            currentValue={
              mockFilterExampleFields[3].filterCategories[0].filterValues[0]
            }
            placeholder={mockFilterExampleFields[3].filterCategoriesPlaceholder}
          />
        </FilterCategorySelector>
      </Filter>
    );
  }
);

stories.add(
  'Filter working example',
  withInfo({
    source: false,
    propTablesExclude: [Row, Col, MockFilterExample],
    text: (
      <div>
        <h1>Story Source</h1>
        <pre>{mockFilterExampleSource}</pre>
      </div>
    )
  })(() => (
    <Row>
      <Col sm={12}>
        <MockFilterExample />
      </Col>
    </Row>
  ))
);
