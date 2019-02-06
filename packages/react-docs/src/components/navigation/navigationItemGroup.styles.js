import { StyleSheet } from '@redallen-patternfly/react-styles';
import { global_spacer_md as spacerMd, global_FontSize_sm as fontSizeSm } from '@redallen-patternfly/react-tokens';

export default StyleSheet.create({
  title: {
    fontSize: fontSizeSm.var,
    padding: spacerMd.var,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
