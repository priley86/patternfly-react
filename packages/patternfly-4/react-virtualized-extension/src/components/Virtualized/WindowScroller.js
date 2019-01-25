import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** Additional classes for header. */
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

class WindowScroller extends React.Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={className} {...props}>
        {' '}
      </div>
    );
  }
}

WindowScroller.propTypes = propTypes;
WindowScroller.defaultProps = defaultProps;

export default WindowScroller;
