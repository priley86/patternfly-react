import React from 'react';
import { Table, TableHeader, sortable, SortByDirection } from '@patternfly/react-table';
import {
  VirtualizedBody,
  VirtualizedBodyWrapper,
  VirtualizedRowWrapper
} from '@patternfly/react-virtualized-extension';
// import './sample.css';

class SortableExample extends React.Component {
  static title = 'Simple Table';
  constructor(props) {
    super(props);

    this.tableBody = React.createRef();
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
        { title: 'Repositories', transforms: [sortable], props: { style: this.tableStyles.td } },
        { title: 'Branches', props: { style: this.tableStyles.td } },
        { title: 'Pull requests', transforms: [sortable], props: { style: this.tableStyles.td } },
        { title: 'Workspaces', props: { style: this.tableStyles.td } },
        { title: 'Last Commit', props: { style: this.tableStyles.td } }
      ],
      rows,
      sortBy: {}
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort(_event, index, direction) {
    const sortedRows = this.state.rows.sort(
      (a, b) => (a.cells[index] < b.cells[index] ? -1 : a.cells[index] > b.cells[index] ? 1 : 0)
    );
    this.tableBody.current.scrollTo(0);
    this.setState({
      sortBy: {
        index,
        direction
      },
      rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
    });
  }

  render() {
    const { columns, rows, sortBy } = this.state;

    return (
      <Table
        style={this.tableStyles.table}
        caption="Sortable Virtualized Table"
        className="pf-c-virtualized"
        cells={columns}
        rows={rows}
        bodyWrapper={VirtualizedBodyWrapper}
        rowWrapper={VirtualizedRowWrapper}
        sortBy={sortBy}
        onSort={this.onSort}
      >
        <TableHeader style={this.tableStyles.thead} />
        <VirtualizedBody height={400} rowKey="id" tableBody={this.tableBody} style={this.tableStyles.tbody} />
      </Table>
    );
  }
}

export default SortableExample;
