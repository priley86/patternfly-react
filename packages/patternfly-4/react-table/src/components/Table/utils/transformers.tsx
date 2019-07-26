export { selectable } from './decorators/selectable';
export { sortable } from './decorators/sortable';
export { cellActions } from './decorators/cellActions';
export { cellWidth } from './decorators/cellWidth';
export { textCenter } from './decorators/textCenter';
export { collapsible, expandedRow, expandable } from './decorators/collapsible';
export { compoundExpand } from './decorators/compoundExpand';
export { headerCol } from './decorators/headerCol';
export { classNames, Visibility } from './decorators/classNames';

import { IFormatterValueType, IExtra } from '../Table';

const emptyTD = () => ({
  scope: '',
  component: 'td'
});
emptyTD.prototype.name = 'emptyTD';

const scopeColTransformer = () => ({
  scope: 'col'
});
scopeColTransformer.prototype.name = 'scopeColTransformer';

const emptyCol = (label: IFormatterValueType) => ({
  ...(label ? {} : { scope: '' })
});
emptyCol.prototype.name = 'emptyCol';

const parentId = (_value: IFormatterValueType, { rowData }: IExtra) => ({
  parentId: rowData.parent
});
parentId.prototype.name = 'parentId';


const mapProps = (_label: IFormatterValueType, { property, rowData }: IExtra) => ({
  ...(rowData[property] && rowData[property].props)
});
mapProps.prototype.name = 'mapProps';

export { emptyTD, scopeColTransformer, emptyCol, parentId, mapProps };
