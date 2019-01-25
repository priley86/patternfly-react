import React from 'react';
import { Table, TableHeader } from '@patternfly/react-table';
import {
  VirtualizedBody,
  VirtualizedBodyWrapper,
  VirtualizedRowWrapper
} from '@patternfly/react-virtualized-extension';

// import './sample.css';

class VirtualizedExample extends React.Component {
  static title = 'Simple Table';
  constructor(props) {
    super(props);

    this.tableStyles = {
      table: {
        display: 'flex',
        flexFlow: 'column'
      },
      thead: {
        display: 'table',
        tableLayout: 'fixed',
        width: '100%'
      },
      tbody: {
        display: 'block',
        overflowY: 'scroll'
      },
      tr: {
        display: 'table',
        tableLayout: 'fixed',
        width: '100%'
      },
      td: {
        width: '20%'
      }
    };
    const rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push({
        id: i,
        props: { style: this.tableStyles.tr },
        cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]
      });
    }
    this.state = {
      columns: [
        { title: 'Repositories', props: { style: this.tableStyles.td } },
        { title: 'Branches', props: { style: this.tableStyles.td } },
        { title: 'Pull requests', props: { style: this.tableStyles.td } },
        { title: 'Workspaces', props: { style: this.tableStyles.td } },
        { title: 'Last Commit', props: { style: this.tableStyles.td } }
      ],
      rows
    };
  }

  render() {
    const { columns, rows } = this.state;

    return (
      <Table
        style={this.tableStyles.table}
        caption="Simple Table"
        className="pf-c-virtualized"
        cells={columns}
        rows={rows}
        bodyWrapper={VirtualizedBodyWrapper}
        rowWrapper={VirtualizedRowWrapper}
      >
        <TableHeader style={this.tableStyles.thead} />
        <VirtualizedBody height={400} rowKey="id" style={this.tableStyles.tbody} />
      </Table>
    );
  }
}

export default VirtualizedExample;
