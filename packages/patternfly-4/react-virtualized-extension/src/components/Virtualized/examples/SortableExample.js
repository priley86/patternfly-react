import React from 'react';
import { Table, TableHeader, sortable, SortByDirection } from '@patternfly/react-table';
import {
  VirtualizedBody,
  VirtualizedBodyWrapper,
  VirtualizedRowWrapper
} from '@patternfly/react-virtualized-extension';

class SortableExample extends React.Component {
  static title = 'Sortable Table';
  constructor(props) {
    super(props);

    this.tableBody = React.createRef();

    const rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push({
        id: i,
        cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]
      });
    }
    this.state = {
      columns: [
        { title: 'Repositories', transforms: [sortable] },
        { title: 'Branches' },
        { title: 'Pull requests', transforms: [sortable] },
        { title: 'Workspaces' },
        { title: 'Last Commit' }
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
        caption="Sortable Virtualized Table"
        className="pf-c-virtualized"
        cells={columns}
        rows={rows}
        bodyWrapper={VirtualizedBodyWrapper}
        rowWrapper={VirtualizedRowWrapper}
        sortBy={sortBy}
        onSort={this.onSort}
      >
        <TableHeader />
        <VirtualizedBody height={400} rowKey="id" tableBody={this.tableBody} />
      </Table>
    );
  }
}

export default SortableExample;
