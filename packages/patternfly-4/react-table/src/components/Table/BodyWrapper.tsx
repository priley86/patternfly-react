import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';
import { IRow, IRowData, IExtraData } from './Table';
import { mapOpenedRows } from './utils/headerUtils';

interface BodyWrapperProps {
  children?: React.ReactNode;
  mappedRows?: IRow[];
  rows?: IRow[];
  onCollapse?: (event: React.MouseEvent, rowIndex: number, isOpen: boolean, rowData: IRowData, extraData: IExtraData) => undefined;
  tbodyRef?: React.Ref<any>;
}

const BodyWrapper: React.FunctionComponent<BodyWrapperProps> = ({
  mappedRows,
  rows = [] as IRow[],
  onCollapse, 
  tbodyRef,
  ...props
} : BodyWrapperProps ) => {
  if (mappedRows && mappedRows.some(row => row.hasOwnProperty('parent'))) {
    return (
      <React.Fragment>
        {mapOpenedRows(mappedRows, props.children).map((oneRow, key) => (
          <tbody
            {...props}
            className={css(oneRow.isOpen && styles.modifiers.expanded)}
            key={`tbody-${key}`}
            ref={tbodyRef}
          >
            {oneRow.rows}
          </tbody>
        ))}
      </React.Fragment>
    );
  }

  return <tbody {...props} ref={tbodyRef} />;
};

export default BodyWrapper;