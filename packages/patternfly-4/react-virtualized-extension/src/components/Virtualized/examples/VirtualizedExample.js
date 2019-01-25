import React from 'react';
import { Table, TableHeader } from '@patternfly/react-table';
import {
  VirtualizedBody,
  VirtualizedBodyWrapper,
  VirtualizedRowWrapper
} from '@patternfly/react-virtualized-extension';
import './sample.css';

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
        { title: 'Repositories', props: { style: { width: '20%' } } },
        { title: 'Branches', props: { style: { width: '20%' } } },
        { title: 'Pull requests', props: { style: { width: '20%' } } },
        { title: 'Workspaces', props: { style: { width: '20%' } } },
        { title: 'Last Commit', props: { style: { width: '20%' } } }
      ],
      rows
    };
  }

  render() {
    const { columns, rows } = this.state;

    return (
      <Table
        caption="Simple Table"
        cells={columns}
        rows={rows}
        bodyWrapper={VirtualizedBodyWrapper}
        rowWrapper={VirtualizedRowWrapper}
      >
        <TableHeader />
        <VirtualizedBody height={400} rowKey="id" />
      </Table>
    );
  }
}

export default VirtualizedExample;
