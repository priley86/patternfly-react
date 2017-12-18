import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton } from '../Button';
import { MenuItem } from '../MenuItem';
import { bindMethods } from '../../common/helpers';
import cx from 'classnames';

class FilterTypeSelector extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['selectFilterType']);
  }

  selectFilterType(filterType) {
    const { onFilterTypeSelected } = this.props;

    onFilterTypeSelected && onFilterTypeSelected(filterType);
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
        onSelect={() => this.selectFilterType()}
      >
        {placeholder}
      </MenuItem>
    );
  }

  renderFilterTypeMenuItems() {
    const { filterTypes, currentFilterType } = this.props;

    return filterTypes.map((item, index) => {
      let classes = {
        selected: item === currentFilterType
      };
      return (
        <MenuItem
          className={classes}
          key={item.id || index}
          onSelect={() => this.selectFilterType(item)}
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
      filterTypes,
      currentFilterType,
      placeholder
    } = this.props;
    let classes = cx('input-group-btn', className);

    if (placeholder || (filterTypes && filterTypes.length > 1)) {
      let title;
      if (currentFilterType) {
        title = currentFilterType.title || currentFilterType;
      } else {
        title = placeholder || filterTypes[0].title || filterTypes[0];
      }

      let menuId = 'filterFieldTypeMenu';
      menuId += id ? '_' + id : '';

      return (
        <div className={classes}>
          <DropdownButton title={title} id={menuId}>
            {this.renderPlaceHolder()}
            {this.renderFilterTypeMenuItems()}
          </DropdownButton>
        </div>
      );
    } else {
      return null;
    }
  }
}

FilterTypeSelector.propTypes = {
  /** Additional css classes */
  className: PropTypes.string,
  /** ID for the filter component, necessary for accessibility if there are multiple filters on a page */
  id: PropTypes.string,
  /** Array of filter types, can be a string or an object with a 'title' field */
  filterTypes: PropTypes.array.isRequired,
  /** Current selected filter type */
  currentFilterType: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Placeholder text when no filter type is selected */
  placeholder: PropTypes.string,
  /** function(field, value) - Callback to call when a filter type is selected */
  onFilterTypeSelected: PropTypes.func
};

export default FilterTypeSelector;
