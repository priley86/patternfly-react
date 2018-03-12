import PropTypes from 'prop-types';

const stepShape = {
  title: PropTypes.string,
  render: PropTypes.func,
  onNext: PropTypes.func,
  isInvalid: PropTypes.bool,
  preventEnter: PropTypes.bool,
  preventExit: PropTypes.bool
};

export { stepShape };
