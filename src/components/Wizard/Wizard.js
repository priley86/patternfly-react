import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wizard - main Wizard component.
 */
const Wizard = ({ children, className, ...rest }) => (
  <div className={className} {...rest}>
    {children}
  </div>
);
Wizard.propTypes = {
  /** Children nodes */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string
};
Wizard.defaultProps = {
  children: null,
  className: ''
};
export default Wizard;
