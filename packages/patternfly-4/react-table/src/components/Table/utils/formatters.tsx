import { IRowCell } from '../Table';

export const defaultTitle = (data: IRowCell) => (data && data.hasOwnProperty('title') ? data.title : data);
