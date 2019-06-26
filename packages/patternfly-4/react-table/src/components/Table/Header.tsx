import * as React from 'react';
import { Header } from './base';
import { IHeaderRow, TableContext } from './Table';

interface ContextHeaderProps {
  className?: string;
  headerRows?: IHeaderRow[];
}

const ContextHeader: React.FunctionComponent<ContextHeaderProps> = ({
  className = '',
  headerRows = undefined as IHeaderRow[],
  ...props
} : ContextHeaderProps ) => (
  <Header {...props} headerRows={headerRows} className={className} />
);

export interface HeaderProps extends React.HTMLProps<HTMLTableRowElement> {
  className?: string;
}

const TableHeader: React.FunctionComponent<HeaderProps> = ({
  ...props
} : HeaderProps ) => (
  <TableContext.Consumer>
  {({ headerRows }) => <ContextHeader {...props} headerRows={headerRows} />}
  </TableContext.Consumer>
);

export default TableHeader;