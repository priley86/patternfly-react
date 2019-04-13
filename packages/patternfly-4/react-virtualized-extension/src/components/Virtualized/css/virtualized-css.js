import { StyleSheet } from '@patternfly/react-styles';

export const virtualizedCss = StyleSheet.parse(`
  /* virtualized tables use aria-hidden tr's to offset scrolled rows -
     do not add extra spacing to these elements as offset height is important
  */
  .pf-c-table tbody tr[aria-hidden="true"] {
    padding: 0 !important;
    margin: 0 !important;
    border: 0 !important;
  }
  .pf-c-virtualized.pf-c-table {
    display: flex;
    flex-flow: column;
  }

  .pf-c-virtualized.pf-c-table thead,
  .pf-c-virtualized.pf-c-table tbody tr {
    display: table;
    table-layout: fixed;
  }

  .pf-c-virtualized.pf-c-table thead {
    /* flex: 0 0 auto; */
    width: 100%;
  }

  .pf-c-virtualized.pf-c-table thead tr {
    /* 0.9em approximates scrollbar width  */
    /* width: calc(100% - 0.9em); */
    width: 100%;
  }

  .pf-c-virtualized.pf-c-table tbody {
    display: block;
    /* flex: 1 1 auto; */
    overflow-y: scroll;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  .pf-c-virtualized.pf-c-table tbody tr {
    width: 100%;
  }
  .pf-c-virtualized.pf-c-table th,
  .pf-c-virtualized.pf-c-table td {
    width: 20%;
  }
`);
