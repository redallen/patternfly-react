import React from 'react';
import { Bullseye } from '@redallen-patternfly/react-core';

class SimpleBullseye extends React.Component {
  render() {
    return (
      <Bullseye>
        <div>centered</div>
      </Bullseye>
    );
  }
}

export default SimpleBullseye;
