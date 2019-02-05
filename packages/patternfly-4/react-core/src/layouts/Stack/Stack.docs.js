import { Stack, StackItem, GutterSize } from '@redallen-patternfly/react-core';
import Simple from './examples/SimpleStack';
import StackWithGutter from './examples/StackWithGutter';
import getContainerProps from './examples/common/getContainerProps';

export default {
  title: 'Stack',
  components: {
    Stack,
    StackItem
  },
  enumValues: {
    'Object.keys(GutterSize)': Object.keys(GutterSize)
  },
  examples: [
    { component: Simple, title: 'Simple Stack Layout', getContainerProps },
    { component: StackWithGutter, title: 'Stack Layout With Gutter', getContainerProps }
  ]
};
