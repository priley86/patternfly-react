import React from 'react';
import { Table, TableHeader, headerCol } from '@patternfly/react-table';
import {
  VirtualizedBody,
  VirtualizedBodyWrapper,
  VirtualizedRowWrapper
} from '@patternfly/react-virtualized-extension';

class SelectableExample extends React.Component {
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
        { title: 'Repositories', cellTransforms: [headerCol()] },
        { title: 'Branches' },
        { title: 'Pull requests' },
        { title: 'Workspaces' },
        { title: 'Last Commit' }
      ],
      rows
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(event, isSelected, virtualRowIndex, rowData) {
    let rows;
    if (virtualRowIndex === -1) {
      rows = this.state.rows.map(oneRow => {
        oneRow.selected = isSelected;
        return oneRow;
      });
    } else {
      rows = [...this.state.rows];
      const rowIndex = rows.findIndex(r => r.id === rowData.id);
      rows[rowIndex].selected = isSelected;
    }
    this.setState({
      rows
    });
  }

  render() {
    const { columns, rows } = this.state;

    return (
      <Table
        className="pf-c-virtualized"
        caption="Selectable Virtualized Table"
        onSelect={this.onSelect}
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

export default SelectableExample;
