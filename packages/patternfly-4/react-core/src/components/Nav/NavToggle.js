import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
  groupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onToggle: PropTypes.func
};

const defaultProps = {
  isExpanded: false,
  groupId: 0,
  onToggle: () => undefined,
  onUpdateIsExpanded: () => undefined
};

class NavToggle extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  handleToggle = e => {
    // Item events can bubble up, ignore those
    if (e.target.getAttribute('data-component') !== 'pf-nav-expandable') {
      return;
    }
    const { groupId, onToggle, isExpanded } = this.props;
    onToggle(e, groupId, !isExpanded);
    this.props.onUpdateIsExpanded(!isExpanded);
  };

  render() {
    return this.props.children({
      toggleValue: this.props.isExpanded,
      toggle: this.handleToggle
    });
  }
}

export default NavToggle;
