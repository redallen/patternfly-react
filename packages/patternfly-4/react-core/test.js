const docgenJavascript = require('react-docgen')
const jsText = `
import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import styles from "../../@patternfly/patternfly/components/Avatar/avatar.css.js";
import { css } from '@patternfly/react-styles';
export var Avatar = function Avatar(props) {
  return React.createElement("img", _extends({}, props, {
    src:  props.src,
    alt:  props.alt,
    className: css(styles.avatar, props.className)
  }));
};
Avatar.propTypes = {
  /** hey look its a comment!!!! */
  className: _pt.string,
  /** hey look 2 */
  src: _pt.string,
  /** hey look 3 */
  alt: _pt.string.isRequired
};
Avatar.defaultProps = {
  className: '_pt.string',
  src: '_pt.string',
  alt: '_pt.string.isRequired'
};

`;

parsed = docgenJavascript.parse(jsText);

console.log('parsed', JSON.stringify(parsed, null, 2));