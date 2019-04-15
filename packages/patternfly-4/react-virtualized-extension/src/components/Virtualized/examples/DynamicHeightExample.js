import React from 'react';
import { Table, TableHeader } from '@patternfly/react-table';
import {
  VirtualizedBody,
  VirtualizedBodyWrapper,
  VirtualizedRowWrapper
} from '@patternfly/react-virtualized-extension';

class DynamicHeightExample extends React.Component {
  static title = 'Simple Table';
  constructor(props) {
    super(props);
    const rows = [];
    for (let i = 0; i < 100; i++) {
      const cells = [];
      const num = Math.floor(Math.random() * Math.floor(9)) + 1;
      for (let j = 0; j < 5; j++) {
        const cellValue = i.toString() + ' Arma virumque cano Troiae qui primus ab oris. '.repeat(num);
        cells.push(cellValue);
      }
      rows.push({
        id: i,
        cells
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

    return (
      <Table
        caption="Virtualized Extension will support dynamic row heights out of the box."
        className="pf-c-virtualized"
        cells={columns}
        rows={rows}
        bodyWrapper={VirtualizedBodyWrapper}
        rowWrapper={VirtualizedRowWrapper}
        aria-rowcount={rows.length}
      >
        <TableHeader />
        <VirtualizedBody height={400} rowKey="id" />
      </Table>
    );
  }
}

export default DynamicHeightExample;
