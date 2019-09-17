import { StyleDeclarationStatic } from './utils';
import { ClassNameArg } from 'create-emotion';

type emotionCss = (...classNames: Array<ClassNameArg | StyleDeclarationStatic>) => string;

export interface StyleSheetStatic {
  parse(cssString: string): StyleSheetValueStatic;
  create<T extends Record<keyof T, any>>(styles: T): Record<keyof T, string>;
}

export type StyleSheetValueStatic = {
  modifiers: { [key: string]: StyleDeclarationStatic };
  inject(): void;
} & {
  [key: string]: any;
};

export const StyleSheet: StyleSheetStatic;

export const css: emotionCss;
