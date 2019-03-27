import {
  VirtualizedBody,
  VirtualizedBodyWrapper,
  VirtualizedRowWrapper,
  WindowScroller
} from '@patternfly/react-virtualized-extension';

import WindowScrollerExample from './examples/WindowScrollerExample';
import VirtualizedExample from './examples/VirtualizedExample';
import SortableExample from './examples/SortableExample';
import SelectableExample from './examples/SelectableExample';

export default {
  title: 'Virtualized',
  components: {
    VirtualizedBody,
    VirtualizedBodyWrapper,
    VirtualizedRowWrapper,
    WindowScroller
  },
  examples: [
    { component: VirtualizedExample, title: 'Simple Virtualized Example' },
    { component: SortableExample, title: 'Sortable Virtualized Example' },
    { component: SelectableExample, title: 'Selectable Virtualized Example' },
    { component: WindowScrollerExample, title: 'WindowScroller Example' }
  ]
};
