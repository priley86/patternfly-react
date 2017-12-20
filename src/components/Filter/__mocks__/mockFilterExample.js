import React from 'react';
import {
  Grid,
  Col,
  Row,
  Filter,
  FilterTypeSelector,
  FilterCategorySelector,
  FilterCategoryValueSelector
} from '../../../index';
import { boolean } from '@storybook/addon-knobs/dist/index';

const bindMethods = (context, methods) => {
  methods.forEach(method => {
    context[method] = context[method].bind(context);
  });
};
export const mockFilterExampleFields = [
  {
    id: 'name',
    title: 'Name',
    placeholder: 'Filter by Name',
    filterType: 'text'
  },
  {
    id: 'address',
    title: 'Address',
    placeholder: 'Filter by Address',
    filterType: 'text'
  },
  {
    id: 'birthMonth',
    title: 'Birth Month',
    placeholder: 'Filter by Birth Month',
    filterType: 'select',
    filterValues: [
      { title: 'January', id: 'jan' },
      { title: 'February', id: 'feb' },
      { title: 'March', id: 'mar' },
      { title: 'April', id: 'apr' },
      { title: 'May', id: 'may' },
      { title: 'June', id: 'jun' },
      { title: 'July', id: 'jul' },
      { title: 'August', id: 'aug' },
      { title: 'September', id: 'sep' },
      { title: 'October', id: 'oct' },
      { title: 'November', id: 'nov' },
      { title: 'December', id: 'dec' }
    ]
  },
  {
    id: 'car',
    title: 'Car',
    placeholder: 'Filter by Car Make',
    filterType: 'complex-select',
    filterValues: [{ title: 'Subaru', id: 'subie' }, 'Toyota'],
    filterCategoriesPlaceholder: 'Filter by Car Model',
    filterCategories: [
      {
        id: 'subie',
        title: 'Subaru',
        filterValues: [
          {
            title: 'Outback',
            id: 'out'
          },
          'Crosstrek',
          'Impreza'
        ]
      },
      {
        id: 'toyota',
        title: 'Toyota',
        filterValues: [
          {
            title: 'Prius',
            id: 'pri'
          },
          'Corolla',
          'Echo'
        ]
      }
    ]
  }
];

export class MockFilterExample extends React.Component {
  constructor() {
    super();

    bindMethods(this, [
      'updateCurrentValue',
      'onValueKeyPress',
      'selectFilterType',
      'filterValueSelected',
      'filterCategorySelected',
      'categoryValueSelected'
    ]);

    this.state = {
      currentFilterType: mockFilterExampleFields[0],
      filtersText: ''
    };
  }

  filterAdded = (field, value) => {
    let filterText = '';
    if (field.title) {
      filterText = field.title;
    } else {
      filterText = field;
    }
    filterText += ': ';

    if (value.filterCategory) {
      filterText +=
        (value.filterCategory.title || value.filterCategory) +
        '-' +
        (value.filterValue.title || value.filterValue);
    } else if (value.title) {
      filterText += value.title;
    } else {
      filterText += value;
    }
    filterText += '\n';
    this.setState({ filtersText: this.state.filtersText + filterText });
  };

  selectFilterType(filterType) {
    const { currentFilterType } = this.state;
    if (currentFilterType !== filterType) {
      this.setState({ currentValue: '', currentFilterType: filterType });

      if (filterType.filterType === 'complex-select') {
        this.setState({ filterCategory: undefined, categoryValue: '' });
      }
    }
  }

  filterValueSelected(filterValue) {
    const { currentFilterType, currentValue } = this.state;

    if (filterValue !== currentValue) {
      this.setState({ currentValue: filterValue });
      if (filterValue) {
        this.filterAdded(currentFilterType, filterValue);
      }
    }
  }

  filterCategorySelected(category) {
    const { filterCategory } = this.state;
    if (filterCategory !== category) {
      this.setState({ filterCategory: category, categoryValue: '' });
    }
  }

  categoryValueSelected(value) {
    const { currentValue, currentFilterType, filterCategory } = this.state;

    if (currentValue !== value) {
      this.setState({ currentValue: value });
      let filterValue = {
        filterCategory: filterCategory,
        filterValue: value
      };
      this.filterAdded(currentFilterType, filterValue);
    }
  }

  updateCurrentValue(event) {
    this.setState({ currentValue: event.target.value });
  }

  onValueKeyPress(keyEvent) {
    const { currentValue, currentFilterType } = this.state;

    if (keyEvent.key === 'Enter' && currentValue && currentValue.length > 0) {
      this.setState({ currentValue: '' });
      this.filterAdded(currentFilterType, currentValue);
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
    }
  }

  renderInput() {
    const { currentFilterType, currentValue, filterCategory } = this.state;
    if (!currentFilterType) {
      return null;
    }

    if (currentFilterType.filterType === 'select') {
      return (
        <Filter.ValueSelector
          filterValues={currentFilterType.filterValues}
          currentValue={currentValue}
          onFilterValueSelected={this.filterValueSelected}
        />
      );
    } else if (currentFilterType.filterType === 'complex-select') {
      return (
        <FilterCategorySelector
          filterCategories={currentFilterType.filterCategories}
          currentCategory={filterCategory}
          placeholder={currentFilterType.placeholder}
          onFilterCategorySelected={this.filterCategorySelected}
        >
          <FilterCategoryValueSelector
            categoryValues={filterCategory && filterCategory.filterValues}
            currentValue={currentValue}
            placeholder={currentFilterType.filterCategoriesPlaceholder}
            onCategoryValueSelected={this.categoryValueSelected}
          />
        </FilterCategorySelector>
      );
    } else {
      return (
        <input
          className="form-control"
          type={currentFilterType.filterType}
          value={currentValue}
          placeholder={currentFilterType.placeholder}
          onChange={e => this.updateCurrentValue(e)}
          onKeyPress={e => this.onValueKeyPress(e)}
        />
      );
    }
  }

  render() {
    const { currentFilterType } = this.state;

    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Filter>
            <FilterTypeSelector
              filterTypes={mockFilterExampleFields}
              currentFilterType={currentFilterType}
              onFilterTypeSelected={this.selectFilterType}
            />
            {this.renderInput()}
          </Filter>
        </div>
        <Grid fluid={boolean('fluid', true)}>
          <Row>
            <Col sm={12}>
              <hr />
            </Col>
            <Col sm={12}>
              <label className="events-label pull-left">
                Current Filters:{' '}
              </label>
            </Col>
            <Col sm={12}>
              <textarea
                rows="5"
                style={{ width: '100%' }}
                value={this.state.filtersText}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export const mockFilterExampleSource = `
import React from 'react';
import {
  Grid,
  Col,
  Row,
  Filter,
  FilterTypeSelector,
  FilterCategorySelector,
  FilterCategoryValueSelector,
} from 'patternfly-react';
import { boolean } from '@storybook/addon-knobs/dist/index';

const bindMethods = (context, methods) => {
  methods.forEach(method => {
    context[method] = context[method].bind(context);
  });
};
export const mockFilterExampleFields = [
  {
    id: 'name',
    title: 'Name',
    placeholder: 'Filter by Name',
    filterType: 'text',
  },
  {
    id: 'address',
    title: 'Address',
    placeholder: 'Filter by Address',
    filterType: 'text',
  },
  {
    id: 'birthMonth',
    title: 'Birth Month',
    placeholder: 'Filter by Birth Month',
    filterType: 'select',
    filterValues: [
      { title: 'January', id: 'jan' },
      { title: 'February', id: 'feb' },
      { title: 'March', id: 'mar' },
      { title: 'April', id: 'apr' },
      { title: 'May', id: 'may' },
      { title: 'June', id: 'jun' },
      { title: 'July', id: 'jul' },
      { title: 'August', id: 'aug' },
      { title: 'September', id: 'sep' },
      { title: 'October', id: 'oct' },
      { title: 'November', id: 'nov' },
      { title: 'December', id: 'dec' },
    ],
  },
  {
    id: 'car',
    title: 'Car',
    placeholder: 'Filter by Car Make',
    filterType: 'complex-select',
    filterValues: [{ title: 'Subaru', id: 'subie' }, 'Toyota'],
    filterCategoriesPlaceholder: 'Filter by Car Model',
    filterCategories: [
      {
        id: 'subie',
        title: 'Subaru',
        filterValues: [
          {
            title: 'Outback',
            id: 'out',
          },
          'Crosstrek',
          'Impreza',
        ],
      },
      {
        id: 'toyota',
        title: 'Toyota',
        filterValues: [
          {
            title: 'Prius',
            id: 'pri',
          },
          'Corolla',
          'Echo',
        ],
      },
    ],
  },
];

export class MockFilterExample extends React.Component {
  constructor() {
    super();

    bindMethods(this, [
      'updateCurrentValue',
      'onValueKeyPress',
      'selectFilterType',
      'filterValueSelected',
      'filterCategorySelected',
      'categoryValueSelected',
    ]);

    this.state = {
      currentFilterType: mockFilterExampleFields[0],
      currentValue: '',
      filterCategory: '',
      categoryValue: '',
      filtersText: '',
    };
  }

  filterAdded = (field, value) => {
    let filterText = '';
    if (field.title) {
      filterText = field.title;
    } else {
      filterText = field;
    }
    filterText += ': ';

    if (value.filterCategory) {
      filterText +=
        (value.filterCategory.title || value.filterCategory) +
        '-' +
        (value.filterValue.title || value.filterValue);
    } else if (value.title) {
      filterText += value.title;
    } else {
      filterText += value;
    }
    filterText += '\\n';
    this.setState({ filtersText: this.state.filtersText + filterText });
  };

  selectFilterType(filterType) {
    const { currentFilterType } = this.state;
    if (currentFilterType !== filterType) {
      this.setState({ currentValue: '', currentFilterType: filterType });

      if (filterType.filterType === 'complex-select') {
        this.setState({ filterCategory: '', categoryValue: '' });
      }
    }
  }

  filterValueSelected(filterValue) {
    const { currentFilterType, currentValue } = this.state;

    if (filterValue !== currentValue) {
      this.setState({ currentValue: filterValue });
      if (filterValue) {
        this.filterAdded(currentFilterType, filterValue);
      }
    }
  }

  filterCategorySelected(categoryValue) {
    const { filterCategory } = this.state;
    if (filterCategory !== categoryValue) {
      this.setState({ filterCategory: categoryValue, categoryValue: '' });
    }
  }

  categoryValueSelected(value) {
    const { currentValue, currentFilterType, filterCategory } = this.state;

    if (currentValue !== value) {
      this.setState({ currentValue: value });
      let filterValue = {
        filterCategory: filterCategory,
        filterValue: value,
      };
      this.filterAdded(currentFilterType, filterValue);
    }
  }

  updateCurrentValue(event) {
    this.setState({ currentValue: event.target.value });
  }

  onValueKeyPress(keyEvent) {
    const { currentValue, currentFilterType } = this.state;

    if (keyEvent.key === 'Enter' && currentValue && currentValue.length > 0) {
      this.setState({ currentValue: '' });
      this.filterAdded(currentFilterType, currentValue);
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
    }
  }

  renderInput() {
    const { currentFilterType, currentValue, filterCategory } = this.state;
    if (!currentFilterType) {
      return null;
    }

    if (currentFilterType.filterType === 'select') {
      return (
        <Filter.ValueSelector
          filterValues={currentFilterType.filterValues}
          currentValue={currentValue}
          onFilterValueSelected={this.filterValueSelected}
        />
      );
    } else if (currentFilterType.filterType === 'complex-select') {
      return (
        <FilterCategorySelector
          filterCategories={currentFilterType.filterCategories}
          currentCategory={filterCategory}
          placeholder={currentFilterType.placeholder}
          onFilterCategorySelected={this.filterCategorySelected}
        >
          <FilterCategoryValueSelector
            categoryValues={filterCategory.filterValues}
            currentValue={currentValue}
            placeholder={currentFilterType.filterCategoriesPlaceholder}
            onCategoryValueSelected={this.categoryValueSelected}
          />
        </FilterCategorySelector>
      );
    } else {
      return (
        <input
          className="form-control"
          type={currentFilterType.filterType}
          value={currentValue}
          placeholder={currentFilterType.placeholder}
          onChange={e => this.updateCurrentValue(e)}
          onKeyPress={e => this.onValueKeyPress(e)}
        />
      );
    }
  }

  render() {
    const { currentFilterType } = this.state;

    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Filter>
            <FilterTypeSelector
              filterTypes={mockFilterExampleFields}
              currentFilterType={currentFilterType}
              onFilterTypeSelected={this.selectFilterType}
            />
            {this.renderInput()}
          </Filter>
        </div>
        <Grid fluid={boolean('fluid', true)}>
          <Row>
            <Col sm={12}>
              <hr />
            </Col>
            <Col sm={12}>
              <label className="events-label pull-left">
                Current Filters:{' '}
              </label>
            </Col>
            <Col sm={12}>
              <textarea
                rows="5"
                style={{ width: '100%' }}
                value={this.state.filtersText}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
`;
