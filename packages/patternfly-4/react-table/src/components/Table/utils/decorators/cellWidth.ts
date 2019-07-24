import { css, getModifier } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';

export const cellWidth = (width: string) => () => ({
  className: css(getModifier(styles, `width-${width}`))
});
