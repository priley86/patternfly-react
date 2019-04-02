import React from 'react';
import PropTypes from 'prop-types';
import { resolveRowKey } from 'reactabular-table';
import { TableBody, TableContext } from '@patternfly/react-table';
import calculateAverageHeight from './utils/calculateAverageHeight';
import calculateRows from './utils/calculateRows';

const initialContext = {
  amountOfRowsToRender: 3, // First few rows for initial measurement
  startIndex: 0, // Index where to start rendering
  startHeight: 0, // Heights for extra rows to mimic scrolling
  endHeight: 0,
  showExtraRow: false // Show extra row (even/odd issue)
};
export const VirtualizedBodyContext = React.createContext(initialContext);

class Body extends React.Component {
  state = initialContext;
  measuredRows = {}; // row key -> measurement
  tbodyRef = null; // tbody ref used for gathering scroll position
  initialMeasurement = true;
  scrollTop = 0;
  timeoutId = 0;

  setTbodyRef = element => {
    this.tbodyRef = element;
  };

  scrollTo = index => {
    const { rows, rowKey } = this.props;
    const startIndex = parseInt(index, 10);

    if (startIndex >= 0) {
      const startHeight =
        calculateAverageHeight({
          measuredRows: this.measuredRows,
          rows,
          rowKey
        }) * startIndex;

      this.scrollTop = startHeight;
      this.tbodyRef.scrollTop = startHeight;

      this.setState(this.calculateRows());
    }
  };

  onScroll = e => {
    const { onScroll, container } = this.props;
    onScroll && onScroll(e);

    const {
      target: { scrollTop }
    } = e;

    // Y didn't change, bail to avoid rendering rows
    if (this.scrollTop === scrollTop) {
      return;
    }

    this.scrollTop = container ? scrollTop - this.getBodyOffset() : scrollTop;

    this.setState(this.calculateRows());
  };

  checkMeasurements = prevProps => {
    // If there are no valid measurements or the rows have changed,
    // calculate some after waiting a while. Without this styling solutions
    // like Radium won't work as you might expect given they can take a while to set container height.
    if (this.initialMeasurement || (prevProps && prevProps.rows !== this.props.rows)) {
      // If the rows have changed, but the user has not scrolled, maintain the existing
      // scroll position
      if (this.tbodyRef) {
        this.tbodyRef.scrollTop = this.scrollTop;
      }
      this.timeoutId = setTimeout(() => {
        const rows = this.calculateRows();

        if (!rows) {
          // Refresh the rows to trigger measurement.
          this.forceUpdate();

          return;
        }

        this.setState(rows, () => {
          this.initialMeasurement = false;
        });
      }, 100);
    }
  };

  getHeight = () => {
    const { container, height, style } = this.props;
    if (container) {
      return container().clientHeight;
    }
    // If `props.height` is not defined, we use `props.style.maxHeight` instead.
    return height || style.maxHeight;
  };

  // Attach information about measuring status. This way we can implement
  // proper shouldComponentUpdate
  rowsToRender = (rows, startIndex, amountOfRowsToRender, rowKey) => {
    const renderedRows = rows.slice(startIndex, startIndex + amountOfRowsToRender).map((rowData, rowIndex) => ({
      ...rowData,
      _measured: !!this.measuredRows[resolveRowKey({ rowData, rowIndex, rowKey })]
    }));
    return renderedRows;
  };

  getBodyOffset = () => this.tbodyRef.parentElement.offsetTop + this.tbodyRef.offsetTop;

  registerContainer = () => {
    setTimeout(() => {
      this.props.container().addEventListener('scroll', this.onScroll);
    }, 0);
  };

  calculateRows = () => {
    const { rows, rowKey } = this.props;
    return calculateRows({
      scrollTop: this.scrollTop,
      measuredRows: this.measuredRows,
      height: this.getHeight(),
      rowKey,
      rows
    });
  };

  componentDidMount() {
    this.checkMeasurements();
    this.props.container && this.registerContainer();
  }

  componentDidUpdate(prevProps) {
    this.checkMeasurements(prevProps);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const { onRow, rows, onScroll, container, rowKey, BodyComponent, ...props } = this.props;
    const { startIndex, amountOfRowsToRender, startHeight, endHeight, showExtraRow } = this.state;
    const height = this.getHeight();

    const rowsToRender = this.rowsToRender(rows, startIndex, amountOfRowsToRender, rowKey);
    if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.LOG_VIRTUALIZED) {
      console.log(
        // eslint-disable-line no-console
        'rendering',
        rowsToRender.length,
        '/',
        rows.length,
        'rows to render',
        rowsToRender,
        'start index',
        startIndex,
        'amount of rows to render',
        amountOfRowsToRender
      );
    }

    const tableBodyProps = {
      ...props,
      style: { height, display: 'block', overflow: 'auto' },
      onRow: (row, extra) => ({
        // Pass index so that row heights can be tracked properly
        'data-rowkey': extra.rowKey,
        ...(onRow ? onRow(row, extra) : {})
      }),
      rowsToRender,
      onScroll: this.onScroll
    };

    return (
      <VirtualizedBodyContext.Provider
        value={{
          tbodyRef: this.setTbodyRef,
          startHeight,
          endHeight,
          showExtraRow,
          updateHeight: (oneRowKey, rowHeight) => {
            this.measuredRows[oneRowKey] = rowHeight;
          },
          // Capture height data only during the initial measurement
          initialMeasurement: this.initialMeasurement
        }}
      >
        <BodyComponent {...tableBodyProps} />
      </VirtualizedBodyContext.Provider>
    );
  }
}

Body.propTypes = {
  ...TableBody.propTypes,
  BodyComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]).isRequired
};

const VirtualizedBody = BodyComponent => {
  const VirtualizedBodyWithContext = ({ tableBody, ...props }) => (
    <TableContext.Consumer>
      {({ headerData, rows }) => (
        <Body {...props} ref={tableBody} headerData={headerData} rows={rows} BodyComponent={BodyComponent} />
      )}
    </TableContext.Consumer>
  );
  VirtualizedBodyWithContext.propTypes = {
    ...TableBody.propTypes,
    height: function heightPropCheck(props, propName, componentName) {
      if (
        typeof props[propName] !== 'number' &&
        (!props.style || typeof props.style.maxHeight !== 'number') &&
        (!props.container || typeof props.container !== 'function')
      ) {
        return new Error(
          `height or style.maxHeight of type 'number' or container of type 'function' is marked as required in ${componentName}`
        );
      }

      return undefined;
    },
    container: PropTypes.func
  };
  VirtualizedBodyWithContext.defaultProps = TableBody.defaultProps;
  return VirtualizedBodyWithContext;
};

// const VirtualizedBody = ({ tableBody, ...props }) => (
//   <TableContext.Consumer>
//     {({ headerData, rows }) => <Body {...props} ref={tableBody} headerData={headerData} rows={rows} />}
//   </TableContext.Consumer>
// );

// VirtualizedBody.defaultProps = TableBody.defaultProps;
// VirtualizedBody.propTypes = {
//   ...TableBody.propTypes,
//   height: heightPropCheck,
//   container: PropTypes.func
// };

// export function heightPropCheck(props, propName, componentName) {
//   if (
//     typeof props[propName] !== 'number' &&
//     (!props.style || typeof props.style.maxHeight !== 'number') &&
//     (!props.container || typeof props.container !== 'function')
//   ) {
//     return new Error(
//       `height or style.maxHeight of type 'number' or container of type 'function' is marked as required in ${componentName}`
//     );
//   }

//   return undefined;
// }

export default VirtualizedBody;
