import React, { Component } from 'react';
import styles from '@patternfly/patternfly/components/Table/table.css';
import { css } from '@redallen-patternfly/react-styles';

const BodyWrapper = (rows) => {
  class TableBody extends Component {
    render() {
      return (
        <tbody {...this.props} className={css(
          rows.some(row => row.isOpen && !row.hasOwnProperty('parent')) && styles.modifiers.expanded
        )} />
      )
    }
  };

  return TableBody;
}

export default BodyWrapper;
