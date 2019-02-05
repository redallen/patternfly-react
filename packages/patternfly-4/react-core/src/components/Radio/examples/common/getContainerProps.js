import { css, StyleSheet } from '@redallen-patternfly/react-styles';

const styles = StyleSheet.create({
  demoLayout: {
    backgroundColor: '#fff'
  }
});

export default () => ({ className: css(styles.demoLayout) });
