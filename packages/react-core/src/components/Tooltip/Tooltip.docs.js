import { Tooltip, TooltipPosition } from '@redallen-patternfly/react-core';
import SimpleTooltip from './examples/SimpleTooltip';
import TooltipPositions from './examples/TooltipPositions';

export default {
  title: 'Tooltip',
  components: {
    Tooltip
  },
  enumValues: {
    'Object.keys(TooltipPosition).map(key => TooltipPosition[key])': Object.keys(TooltipPosition).map(
      key => TooltipPosition[key]
    )
  },
  examples: [
    { component: SimpleTooltip, title: 'Simple Tooltip' },
    { component: TooltipPositions, title: 'Tooltip Positions' }
  ]
};
