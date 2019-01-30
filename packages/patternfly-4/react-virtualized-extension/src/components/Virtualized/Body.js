import React from 'react';
import PropTypes from 'prop-types';
import { resolveRowKey } from 'reactabular-table';
import { TableBody, TableContext } from '@patternfly/react-table';
import calculateAverageHeight from './utils/calculateAverageHeight';
import calculateRows from './utils/calculateRows';

const initialContext = {
  amountOfRowsToRender: 3, // First few rows for initial measurement
  startIndex: 0, // Index where to start rendering

  // Heights for extra rows to mimic scrolling
  startHeight: 0,
  endHeight: 0,

  // Show extra row (even/odd issue)
  showExtraRow: false
};
export const VirtualizedBodyContext = React.createContext(initialContext);

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.measuredRows = {}; // row key -> measurement

    this.ref = React.createRef();

    this.scrollTo = index => {
      const startIndex = parseInt(index, 10);

      if (startIndex >= 0) {
        const startHeight =
          calculateAverageHeight({
            measuredRows: this.measuredRows,
            rows: props.rows,
            rowKey: props.rowKey
          }) * startIndex;

        this.scrollTop = startHeight;
        this.ref.current.scrollTop = startHeight;

        this.setState(this.calculateRows(this.props));
      }
    };

    this.scrollTop = 0;
    this.initialMeasurement = true;
    this.timeoutId = 0;

    this.state = initialContext;

    this.checkMeasurements = this.checkMeasurements.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }
  componentDidMount() {
    this.checkMeasurements();
    this.props.container && this.registerContainer();
  }
  registerContainer() {
    setTimeout(() => {
      this.props.container().addEventListener('scroll', this.onScroll);
    }, 0);
  }
  componentDidUpdate(prevProps) {
    this.checkMeasurements(prevProps);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  getHeight(props) {
    if (this.props.container) {
      return this.props.container().clientHeight;
    }
    // If `props.height` is not defined, we use `props.style.maxHeight` instead.
    return props.height || props.style.maxHeight;
  }

  render() {
    const { onRow, rows, onScroll, container, ...props } = this.props;
    const { startIndex, amountOfRowsToRender, startHeight, endHeight, showExtraRow } = this.state;
    const height = this.getHeight(this.props);

    // Attach information about measuring status. This way we can implement
    // proper shouldComponentUpdate
    const rowsToRender = rows.slice(startIndex, startIndex + amountOfRowsToRender).map((rowData, rowIndex) => ({
      ...rowData,
      _measured: !!this.measuredRows[
        resolveRowKey({
          rowData,
          rowIndex,
          rowKey: this.props.rowKey
        })
      ]
    }));

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
      onRow: (row, extra) => {
        const rowProps = onRow ? onRow(row, extra) : {};

        return {
          // Pass index so that row heights can be tracked properly
          'data-rowkey': extra.rowKey,
          ...rowProps
        };
      },
      rowsToRender,
      onScroll: this.onScroll
    };

    return (
      <VirtualizedBodyContext.Provider
        value={{
          bodyRef: this.ref,
          startHeight,
          endHeight,
          showExtraRow,
          updateHeight: (rowKey, rowHeight) => {
            this.measuredRows[rowKey] = rowHeight;
          },
          // Capture height data only during the initial measurement
          initialMeasurement: this.initialMeasurement
        }}
      >
        <TableBody {...tableBodyProps} />
      </VirtualizedBodyContext.Provider>
    );
  }

  getBodyOffset() {
    return this.ref.current.parentElement.offsetTop + this.ref.current.offsetTop;
  }

  onScroll(e) {
    const { onScroll } = this.props;
    onScroll && onScroll(e);

    const {
      target: { scrollTop }
    } = e;

    // Y didn't change, bail to avoid rendering rows
    if (this.scrollTop === scrollTop) {
      return;
    }

    this.scrollTop = this.props.container ? scrollTop - this.getBodyOffset() : scrollTop;

    this.setState(this.calculateRows(this.props));
  }

  calculateRows(props) {
    return calculateRows({
      scrollTop: this.scrollTop,
      measuredRows: this.measuredRows,
      height: this.getHeight(props),
      rowKey: props.rowKey,
      rows: props.rows
    });
  }
  checkMeasurements(prevProps) {
    // If there are no valid measurements or the rows have changed,
    // calculate some after waiting a while. Without this styling solutions
    // like Radium won't work as you might expect given they can take a while to set container height.
    if (this.initialMeasurement || (prevProps && prevProps.rows !== this.props.rows)) {
      // If the rows have changed, but the user has not scrolled, maintain the existing
      // scroll position
      if (this.ref.current) {
        this.ref.current.scrollTop = this.scrollTop;
      }
      this.timeoutId = setTimeout(() => {
        const rows = this.calculateRows(this.props);

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
  }
}

const VirtualizedBody = ({ tableBody, ...props }) => (
  <TableContext.Consumer>
    {({ headerData, rows }) => <Body {...props} ref={tableBody} headerData={headerData} rows={rows} />}
  </TableContext.Consumer>
);

VirtualizedBody.defaultProps = TableBody.defaultProps;
VirtualizedBody.propTypes = {
  ...TableBody.propTypes,
  height: heightPropCheck,
  container: PropTypes.func
};

export function heightPropCheck(props, propName, componentName) {
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
}

export default VirtualizedBody;
