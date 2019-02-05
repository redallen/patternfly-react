import { StyleSheet, css } from '@redallen-patternfly/react-styles';
import { global_BorderColor as borderColor, global_BorderWidth_md as borderWidth } from '@redallen-patternfly/react-tokens';

const styles = StyleSheet.create({
  demoLayout: {
    '& .pf-l-stack > .pf-l-stack__item': {
      minHeight: 35,
      borderWidth: borderWidth.var,
      borderStyle: 'dashed',
      borderColor: borderColor.var
    },
    '&': {
      height: 250
    }
  }
});

export default () => ({ className: css(styles.demoLayout) });
