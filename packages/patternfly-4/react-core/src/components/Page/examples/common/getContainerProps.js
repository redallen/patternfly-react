import { StyleSheet, css } from '@redallen-patternfly/react-styles';
import { global_BorderColor as borderColor, global_BorderWidth_md as borderWidth } from '@redallen-patternfly/react-tokens';

const styles = StyleSheet.create({
  demoLayout: {
    '& .pf-l-page > *': {
      borderWidth: borderWidth.var,
      borderStyle: 'dashed',
      borderColor: borderColor.var
    },
    '& .pf-l-page__header > *': {
      borderWidth: borderWidth.var,
      borderStyle: 'dashed',
      borderColor: borderColor.var
    }
  }
});

export default () => ({ className: css(styles.demoLayout) });
