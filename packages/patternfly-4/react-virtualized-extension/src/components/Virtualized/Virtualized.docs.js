import { AutoSizer } from '@patternfly/react-virtualized-extension';
import AutoSizerExample from './examples/AutoSizerExample';
import VirtualizedExample from './examples/VirtualizedExample';

export default {
  title: 'Virtualized',
  components: {
    AutoSizer
  },
  examples: [
    { component: AutoSizerExample, title: 'Simple AutoSizer Example' },
    { component: VirtualizedExample, title: 'Simple Virtualized Example' }
  ]
};
