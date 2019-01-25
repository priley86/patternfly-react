import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** Additional classes for header. */
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

class AutoSizer extends React.Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={className} {...props}>
        {' '}
        Patrick wants to autosize this too.{' '}
      </div>
    );
  }
}

AutoSizer.propTypes = propTypes;
AutoSizer.defaultProps = defaultProps;

export default AutoSizer;
