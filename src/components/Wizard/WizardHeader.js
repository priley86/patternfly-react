import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WizardHeader component for Patternfly React
 */
const WizardHeader = ({ children, className, title, ...rest }) => {
  const classes = classNames('wizard-pf-header', className);
  return (
    <div className={classes} {...rest}>
      <h4 className="wizard-pf-title">{title}</h4>
    </div>
  );
};
WizardHeader.propTypes = {
  /** Children nodes  */
  children: PropTypes.node,
  /** Additional css classes */
  className: PropTypes.string,
  /** The wizard title */
  title: PropTypes.string
};
WizardHeader.defaultProps = {
  children: null,
  className: '',
  title: ''
};
export default WizardHeader;
