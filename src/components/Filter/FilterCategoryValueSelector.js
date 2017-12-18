import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton } from '../Button';
import { MenuItem } from '../MenuItem';
import { bindMethods } from '../../common/helpers';
import cx from 'classnames';

class FilterCategoryValueSelector extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['selectCategoryValue']);
  }

  selectCategoryValue(filterValue) {
    const { onCategoryValueSelected } = this.props;

    onCategoryValueSelected && onCategoryValueSelected(filterValue);
  }

  renderPlaceHolder() {
    const { placeholder } = this.props;

    if (!placeholder) {
      return null;
    }

    return (
      <MenuItem
        title={placeholder}
        key="Placeholder3"
        onSelect={() => this.selectCategoryValue()}
      >
        {placeholder}
      </MenuItem>
    );
  }

  renderSelectMenuItems() {
    const { categoryValues, currentValue } = this.props;

    if (!categoryValues) {
      return null;
    }

    return categoryValues.map((item, index) => {
      let classes = {
        selected: item === currentValue
      };
      return (
        <MenuItem
          className={classes}
          key={item.id || index}
          onSelect={() => this.selectCategoryValue(item)}
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
      categoryValues,
      currentValue,
      placeholder
    } = this.props;
    let classes = cx('filter-pf-select', className);

    if (placeholder || (categoryValues && categoryValues.length > 1)) {
      let title;
      if (currentValue) {
        title = currentValue.title || currentValue;
      } else {
        title = placeholder || categoryValues[0].title || categoryValues[0];
      }

      let menuId = 'filterCategoryMenu';
      menuId += id ? '_' + id : '';

      return (
        <div className={classes}>
          <DropdownButton
            className="filter-pf-category-select-value filter-pf-select-dropdown"
            title={title}
            id={menuId}
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

FilterCategoryValueSelector.propTypes = {
  /** Additional css classes */
  className: PropTypes.string,
  /** ID for the filter component, necessary for accessibility if there are multiple filters on a page */
  id: PropTypes.string,
  /** Array of valid values for the category to select from, each can be a string or an object with a 'title' field */
  categoryValues: PropTypes.array,
  /** Currently selected category value */
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Placeholder text when no category value is selected */
  placeholder: PropTypes.string,
  /** function(field, value) - Callback to call when a category value is selected */
  onCategoryValueSelected: PropTypes.func
};

export default FilterCategoryValueSelector;
