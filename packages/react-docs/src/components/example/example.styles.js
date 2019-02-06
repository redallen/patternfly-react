import { StyleSheet } from '@redallen-patternfly/react-styles';
import {
  global_spacer_md as spacerMd,
  global_BorderWidth_sm as borderWidth,
  global_BorderColor_dark as borderColor
} from '@redallen-patternfly/react-tokens';

export default StyleSheet.create({
  example: {
    padding: spacerMd.var,
    border: `${borderWidth.var} solid ${borderColor.var}`
  }
});
