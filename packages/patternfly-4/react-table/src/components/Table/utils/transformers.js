export { selectable } from './decorators/selectable';
export { sortable } from './decorators/sortable';
export { cellActions } from './decorators/cellActions';
export { cellWidth } from './decorators/cellWidth';
export { textCenter } from './decorators/textCenter';
export { collapsible, expandedRow, expandable } from './decorators/collapsible';
export { compoundExpand } from './decorators/compoundExpand';
export { headerCol } from './decorators/headerCol';
export { classNames, Visibility } from './decorators/classNames';

export const emptyTD = () => ({
  scope: '',
  component: 'td'
});

export const scopeColTransformer = () => ({
  scope: 'col'
});

export const emptyCol = label => ({
  ...(label ? {} : { scope: '' })
});

export const parentId = (_value, { rowData }) => ({
  parentId: rowData.parent
});

export const mapProps = (_label, { property, rowData }) => ({
  ...(rowData[property] && rowData[property].props)
});
