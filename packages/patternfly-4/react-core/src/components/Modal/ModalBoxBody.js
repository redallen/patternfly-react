import React from 'react';
import { css } from '@redallen-patternfly/react-styles';
import PropTypes from 'prop-types';
import styles from '@patternfly/patternfly/components/ModalBox/modal-box.css';

const propTypes = {
  /** content rendered inside the ModalBoxBody */
  children: PropTypes.node,
  /** additional classes added to the ModalBoxBody */
  className: PropTypes.string,
  /** id to use for Modal Box description */
  id: PropTypes.string.isRequired,
  /** Additional props are spread to the container <div> */
  '': PropTypes.any
};

const defaultProps = {
  children: null,
  className: ''
};

const ModalBoxBody = ({ children, className, id, ...props }) => (
  <div {...props} className={css(styles.modalBoxBody, className)} id={id}>
    {children}
  </div>
);

ModalBoxBody.propTypes = propTypes;
ModalBoxBody.defaultProps = defaultProps;

export default ModalBoxBody;
