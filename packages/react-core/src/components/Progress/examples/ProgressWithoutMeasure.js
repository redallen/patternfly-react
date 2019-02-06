import React from 'react';
import { Progress, ProgressMeasureLocation } from '@redallen-patternfly/react-core';

class ProgressWithoutMeasure extends React.Component {
  render() {
    return <Progress value={33} title="Descriptive text here" measureLocation={ProgressMeasureLocation.none} />;
  }
}

export default ProgressWithoutMeasure;
