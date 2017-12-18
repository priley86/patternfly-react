import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton } from '../Button';
import { MenuItem } from '../MenuItem';
import { bindMethods } from '../../common/helpers';
import cx from 'classnames';

class FilterCategorySelector extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['selectFilterCategory']);
  }

  selectFilterCategory(filterCategory) {
    const { onFilterCategorySelected } = this.props;

    onFilterCategorySelected && onFilterCategorySelected(filterCategory);
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
        onSelect={() => this.selectFilterCategory()}
      >
        {placeholder}
      </MenuItem>
    );
  }

  renderFilterCategoryMenuItems() {
    const { filterCategories, currentCategory } = this.props;

    if (!filterCategories) {
      return null;
    }

    return filterCategories.map((item, index) => {
      let classes = {
        selected: item === currentCategory
      };
      return (
        <MenuItem
          className={classes}
          key={item.id || index}
          onSelect={() => this.selectFilterCategory(item)}
        >
          {item.title || item}
        </MenuItem>
      );
    });
  }

  render() {
    const {
      className,
      children,
      id,
      filterCategories,
      currentCategory,
      placeholder
    } = this.props;
    let classes = cx('filter-pf-category-select', className);

    if (placeholder || (filterCategories && filterCategories.length > 1)) {
      let title;
      if (currentCategory) {
        title = currentCategory.title || currentCategory;
      } else {
        title = placeholder || filterCategories[0].title || filterCategories[0];
      }

      let menuId = 'filterCategoryMenu';
      menuId += id ? '_' + id : '';

      return (
        <div className={classes}>
          <div className="filter-pf-select">
            <DropdownButton
              title={title}
              id={menuId}
              className="filter-pf-select-dropdown"
            >
              {this.renderPlaceHolder(placeholder)}
              {this.renderFilterCategoryMenuItems()}
            </DropdownButton>
          </div>
          {children}
        </div>
      );
    } else {
      return null;
    }
  }
}

FilterCategorySelector.propTypes = {
  /** Children nodes */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string,
  /** ID for the component, necessary for accessibility if there are multiple filters on a page */
  id: PropTypes.string,
  /** Array of filter categories, each can be a string or an object with a 'title' field */
  filterCategories: PropTypes.array.isRequired,
  /** Current selected category */
  currentCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Placeholder text when no category is selected */
  placeholder: PropTypes.string,
  /** function(field, value) - Callback to call when a category is added */
  onFilterCategorySelected: PropTypes.func
};

export default FilterCategorySelector;
