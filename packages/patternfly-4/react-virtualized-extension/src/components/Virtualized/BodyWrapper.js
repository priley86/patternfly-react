import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BodyWrapper as ReactTableBodyWrapper } from '@patternfly/react-table';
import { VirtualizedBodyContext } from './Body';
import { bodyWrapperContextTypes, bodyWrapperTypes } from './types';

import { virtualizedCss } from './css/virtualized-css';

virtualizedCss.inject();

class BodyWrapper extends Component {
  tr = props => React.createElement('tr', props);
  render() {
    const { children, tbodyRef, startHeight, endHeight, showExtraRow, BodyWrapperComponent, ...props } = this.props;
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
      <BodyWrapperComponent {...props} tbodyRef={tbodyRef}>
        {rows}
      </BodyWrapperComponent>
    );
  }
}
BodyWrapper.contextTypes = bodyWrapperContextTypes;
BodyWrapper.propTypes = {
  ...ReactTableBodyWrapper.propTypes,
  ...bodyWrapperTypes,
  BodyWrapperComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]).isRequired
};

const VirtualizedBodyWrapper = BodyWrapperComponent => {
  const VirtualizedBodyWrapperWithContext = ({ ...props }) => (
    <VirtualizedBodyContext.Consumer>
      {({ tbodyRef, startHeight, endHeight, showExtraRow }) => (
        <BodyWrapper
          {...props}
          tbodyRef={tbodyRef}
          startHeight={startHeight}
          endHeight={endHeight}
          showExtraRow={showExtraRow}
          BodyWrapperComponent={BodyWrapperComponent}
        />
      )}
    </VirtualizedBodyContext.Consumer>
  );
  VirtualizedBodyWrapperWithContext.propTypes = {
    ...ReactTableBodyWrapper.propTypes
  };
  return VirtualizedBodyWrapperWithContext;
};

export default VirtualizedBodyWrapper;
