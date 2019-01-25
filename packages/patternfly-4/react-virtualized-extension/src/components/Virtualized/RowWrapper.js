import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash-es';
import { columnsAreEqual } from 'reactabular-table';
import { RowWrapper } from '@patternfly/react-table';
import { VirtualizedBodyContext } from './Body';

class VirtualizedRowWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.updateHeight = this.updateHeight.bind(this);
  }
  componentDidMount() {
    this.updateHeight();
  }
  componentDidUpdate() {
    // Capture height data only during initial measurement for performance.
    // This loses some accuracy if row height changes, but it's good enough
    // for most purposes.
    if (this.props.initialMeasurement) {
      this.updateHeight();
    }
  }
  render() {
    const { updateHeight, initialMeasurement, ...props } = this.props;
    return <RowWrapper trRef={this.ref} {...props} />;
  }
  updateHeight() {
    this.props.updateHeight(this.props.rowProps['data-rowkey'], this.ref.current.offsetHeight);
  }
}
VirtualizedRowWrapper.propTypes = {
  rowProps: PropTypes.shape({
    'data-rowkey': PropTypes.string.isRequired
  }).isRequired,
  updateHeight: PropTypes.func.isRequired,
  initialMeasurement: PropTypes.bool.isRequired
};

VirtualizedRowWrapper.shouldComponentUpdate = function(nextProps) {
  const previousProps = this.props;

  // Update only if a row has not been measured and either
  // columns or rowData hasn't changed
  if (nextProps.rowData._measured) {
    return !(
      columnsAreEqual(previousProps.columns, nextProps.columns) && isEqual(previousProps.rowData, nextProps.rowData)
    );
  }

  return true;
};

const VirtualizedRowWrapperWithContext = props => (
  <VirtualizedBodyContext.Consumer>
    {({ updateHeight, initialMeasurement }) => (
      <VirtualizedRowWrapper {...props} updateHeight={updateHeight} initialMeasurement={initialMeasurement} />
    )}
  </VirtualizedBodyContext.Consumer>
);

export default VirtualizedRowWrapperWithContext;
