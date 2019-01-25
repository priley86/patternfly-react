import React, { Component } from 'react';
import styles from '@patternfly/patternfly/components/Table/table.css';
import { css } from '@patternfly/react-styles';
import { VirtualizedBodyContext } from './Body';
import { bodyWrapperContextTypes, bodyWrapperTypes } from './types';

const VirtualizedBodyWrapper = inputRows => {
  class VirtualizedBody extends Component {
    constructor(props) {
      super(props);
      this.ref = React.createRef();
    }
    render() {
      const { children, startHeight, endHeight, showExtraRow, mappedRows, ...props } = this.props;
      const startRow = tr({
        key: 'start-row',
        style: {
          height: startHeight
        }
      });
      const endRow = tr({
        key: 'end-row',
        style: {
          height: endHeight
        }
      });
      // Extra row to keep onRow indexing stable instead of even/odd. This is important
      // for styling.
      const rows = [startRow].concat(children).concat(endRow);

      if (showExtraRow) {
        rows.unshift(
          tr({
            key: 'extra-row',
            style: {
              height: 0
            }
          })
        );
      }

      return React.createElement(
        'tbody',
        {
          ...props,
          ref: this.ref,
          className: css(
            inputRows.some(row => row.isOpen && !row.hasOwnProperty('parent')) && styles.modifiers.expanded
          )
        },
        rows
      );
    }
    getRef() {
      return this.ref;
    }
  }
  VirtualizedBodyWrapper.contextTypes = bodyWrapperContextTypes;
  VirtualizedBodyWrapper.propTypes = bodyWrapperTypes;

  function tr(props) {
    return React.createElement('tr', props);
  }

  const VirtualizedBodyWithContext = props => (
    <VirtualizedBodyContext.Consumer>
      {({ startHeight, endHeight, showExtraRow }) => (
        <VirtualizedBody {...props} startHeight={startHeight} endHeight={endHeight} showExtraRow={showExtraRow} />
      )}
    </VirtualizedBodyContext.Consumer>
  );
  return VirtualizedBodyWithContext;
};

export default VirtualizedBodyWrapper;
