import React from 'react';
import PropTypes from 'prop-types';
import { noop, Modal, Icon } from '../../index';

/**
 * WizardHeader component for Patternfly React
 */
const WizardHeader = ({ onClose, title, ...props }) => (
  <Modal.Header {...props}>
    <button
      className="close"
      onClick={onClose}
      aria-hidden="true"
      aria-label="Close"
    >
      <Icon type="pf" name="close" />
    </button>
    <Modal.Title>{title}</Modal.Title>
  </Modal.Header>
);
WizardHeader.propTypes = {
  /** onClose callback */
  onClose: PropTypes.func,
  /** The wizard title */
  title: PropTypes.node
};
WizardHeader.defaultProps = {
  onClose: noop,
  title: null
};
export default WizardHeader;
