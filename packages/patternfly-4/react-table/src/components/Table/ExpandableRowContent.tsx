import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';

interface ExpandableRowContentProps {
  children?: React.ReactNode
}

const ExpandableRowContent: React.FunctionComponent<ExpandableRowContentProps> = ({
  children = null as React.ReactNode,
  ...props
} : ExpandableRowContentProps ) => {
  return (
    <div {...props} className={css(styles.tableExpandableRowContent)}>
      {children}
    </div>
  );
};

export default ExpandableRowContent;