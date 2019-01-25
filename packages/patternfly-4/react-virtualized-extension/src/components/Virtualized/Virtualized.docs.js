import {
  AutoSizer,
  VirtualizedBody,
  VirtualizedBodyWrapper,
  VirtualizedRowWrapper
} from '@patternfly/react-virtualized-extension';
import AutoSizerExample from './examples/AutoSizerExample';
import VirtualizedExample from './examples/VirtualizedExample';
import SortableExample from './examples/SortableExample';

export default {
  title: 'Virtualized',
  components: {
    AutoSizer,
    VirtualizedBody,
    VirtualizedBodyWrapper,
    VirtualizedRowWrapper
  },
  examples: [
    { component: AutoSizerExample, title: 'Simple AutoSizer Example' },
    { component: VirtualizedExample, title: 'Simple Virtualized Example' },
    { component: SortableExample, title: 'Sortable Virtualized Example' }
  ]
};
