import { css, StyleSheet } from '@redallen-patternfly/react-styles';

const styles = StyleSheet.create({
  demoLayout: {
    '& > *': {
      '.chart-overflow': {
        '& svg': {
          overflow: 'visible'
        }
      },
      '.chart-title': {
        marginBottom: '25px',
        marginLeft: '10px'
      }
    }
  }
});

export default () => ({ className: css(styles.demoLayout) });
