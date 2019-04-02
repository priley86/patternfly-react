import React, { Component } from 'react';
import { VirtualizedBodyContext } from './Body';
import { BodyWrapper as ReactTableBodyWrapper } from '@patternfly/react-table';
import { bodyWrapperContextTypes, bodyWrapperTypes } from './types';

import { virtualizedCss } from './css/virtualized-css';

virtualizedCss.inject();

class BodyWrapper extends Component {
  tr = props => React.createElement('tr', props);
  render() {
    const { children, tbodyRef, startHeight, endHeight, showExtraRow, mappedRows, ...props } = this.props;
    const startRow = this.tr({
      key: 'start-row',
      style: {
        height: startHeight
      },
      'aria-hidden': true
    });
    const endRow = this.tr({
      key: 'end-row',
      style: {
        height: endHeight
      },
      'aria-hidden': true
    });
    // Extra row to keep onRow indexing stable instead of even/odd. This is important
    // for styling.
    const rows = [startRow].concat(children).concat(endRow);

    if (showExtraRow) {
      rows.unshift(
        this.tr({
          key: 'extra-row',
          style: {
            height: 0
          },
          'aria-hidden': true
        })
      );
    }

    return (
      <ReactTableBodyWrapper {...props} tbodyRef={tbodyRef}>
        {rows}
      </ReactTableBodyWrapper>
    );
  }
}
BodyWrapper.contextTypes = bodyWrapperContextTypes;
BodyWrapper.propTypes = bodyWrapperTypes;

const VirtualizedBodyWrapper = ({ ...props }) => (
  <VirtualizedBodyContext.Consumer>
    {({ tbodyRef, startHeight, endHeight, showExtraRow }) => (
      <BodyWrapper
        {...props}
        tbodyRef={tbodyRef}
        startHeight={startHeight}
        endHeight={endHeight}
        showExtraRow={showExtraRow}
      />
    )}
  </VirtualizedBodyContext.Consumer>
);
export default VirtualizedBodyWrapper;
