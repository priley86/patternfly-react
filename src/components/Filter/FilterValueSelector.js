import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton } from '../Button';
import { MenuItem } from '../MenuItem';
import { bindMethods } from '../../common/helpers';
import cx from 'classnames';

class FilterValueSelector extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['selectFilterValue']);
  }

  selectFilterValue(filterValue) {
    const { onFilterValueSelected } = this.props;

    onFilterValueSelected && onFilterValueSelected(filterValue);
  }

  renderPlaceHolder() {
    const { placeholder } = this.props;

    if (!placeholder) {
      return null;
    }

    return (
      <MenuItem
        title={placeholder}
        key="Placeholder"
        onSelect={() => this.selectFilterValue()}
      >
        {placeholder}
      </MenuItem>
    );
  }

  renderSelectMenuItems() {
    const { filterValues, currentValue } = this.props;

    return filterValues.map((item, index) => {
      let classes = {
        selected: item === currentValue
      };
      return (
        <MenuItem
          className={classes}
          key={item.id || index}
          onSelect={() => this.selectFilterValue(item)}
        >
          {item.title || item}
        </MenuItem>
      );
    });
  }

  render() {
    const {
      className,
      id,
      filterValues,
      currentValue,
      placeholder
    } = this.props;
    let classes = cx('filter-pf-select', className);

    if (placeholder || (filterValues && filterValues.length > 1)) {
      let title;
      if (currentValue) {
        title = currentValue.title || currentValue;
      } else {
        title = placeholder || filterValues[0].title || filterValues[0];
      }

      let menuId = 'filterCategoryMenu';
      menuId += id ? '_' + id : '';

      return (
        <div className={classes}>
          <DropdownButton
            title={title}
            id={menuId}
            className="filter-pf-select-dropdown"
          >
            {this.renderPlaceHolder()}
            {this.renderSelectMenuItems()}
          </DropdownButton>
        </div>
      );
    } else {
      return null;
    }
  }
}

FilterValueSelector.propTypes = {
  /** Additional css classes */
  className: PropTypes.string,
  /** ID for the filter component, necessary for accessibility if there are multiple filters on a page */
  id: PropTypes.string,
  /** Array of valid values to select from, each can be a string or an object with a 'title' field */
  filterValues: PropTypes.array.isRequired,
  /** Currently selected value */
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Placeholder text when no value is selected */
  placeholder: PropTypes.string,
  /** function(field, value) - Callback to call when a value is selected */
  onFilterValueSelected: PropTypes.func
};

export default FilterValueSelector;
