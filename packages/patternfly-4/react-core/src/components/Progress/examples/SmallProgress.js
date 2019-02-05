import React from 'react';
import { Progress, ProgressSize } from '@redallen-patternfly/react-core';

class SmallProgress extends React.Component {
  render() {
    return <Progress value={33} title="Descriptive text here" size={ProgressSize.sm} />;
  }
}

export default SmallProgress;
