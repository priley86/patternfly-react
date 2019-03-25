import React from 'react';
import { Table, TableHeader } from '@patternfly/react-table';
import {
  VirtualizedBody,
  VirtualizedBodyWrapper,
  VirtualizedRowWrapper,
  WindowScroller
} from '@patternfly/react-virtualized-extension';

class AutoSizerExample extends React.Component {
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

    return (
      <div id="content-scrollable-1" style={{ height: 300, width: '100%', overflow: 'auto' }}>
        <WindowScroller scrollElement="#content-scrollable-1">
          {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
            <Table
              caption="Simple Table"
              className="pf-c-virtualized"
              cells={columns}
              rows={rows}
              bodyWrapper={VirtualizedBodyWrapper}
              rowWrapper={VirtualizedRowWrapper}
            >
              <TableHeader />
              <VirtualizedBody height={height || 400} rowKey="id" />
            </Table>
          )}
        </WindowScroller>
      </div>
    );
  }
}

export default AutoSizerExample;
