import { IFormatterValueType } from '../Table';

const defaultTitle = (data: IFormatterValueType) => (data && data.hasOwnProperty('title') ? data.title : data);
defaultTitle.prototype.name = 'defaultTitle';

export { defaultTitle };