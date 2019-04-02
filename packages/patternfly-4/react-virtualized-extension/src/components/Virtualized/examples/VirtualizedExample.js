import React from 'react';
import { BodyWrapper, Table, TableBody, TableHeader, RowWrapper } from '@patternfly/react-table';
import {
  VirtualizedBody,
  VirtualizedBodyWrapper,
  VirtualizedRowWrapper
} from '@patternfly/react-virtualized-extension';

class VirtualizedExample extends React.Component {
  static title = 'Simple Table';
  constructor(props) {
    super(props);
    const rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push({
        id: i,
        cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]
      });
    }
    this.state = {
      columns: [
        { title: 'Repositories' },
        { title: 'Branches' },
        { title: 'Pull requests' },
        { title: 'Workspaces' },
        { title: 'Last Commit' }
      ],
      rows
    };
  }

  render() {
    const { columns, rows } = this.state;
    const ComposedRowWrapper = VirtualizedRowWrapper(RowWrapper);
    const ComposedBodyWrapper = VirtualizedBodyWrapper(BodyWrapper);
    const ComposedBody = VirtualizedBody(TableBody);

    return (
      <Table
        caption="Simple Table"
        className="pf-c-virtualized"
        cells={columns}
        rows={rows}
        bodyWrapper={ComposedBodyWrapper}
        rowWrapper={ComposedRowWrapper}
      >
        <TableHeader />
        <ComposedBody height={400} rowKey="id" />
      </Table>
    );
  }
}

export default VirtualizedExample;
