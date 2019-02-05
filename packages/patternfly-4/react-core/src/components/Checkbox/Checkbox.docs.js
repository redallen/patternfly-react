import Controlled from './examples/ControlledCheckbox';
import Uncontrolled from './examples/UncontrolledCheckbox';
import Disabled from './examples/DisabledCheckbox';
import { Checkbox } from '@redallen-patternfly/react-core';

export default {
  title: 'Checkbox',
  components: {
    Checkbox
  },
  examples: [
    { component: Controlled, title: 'Controlled Checkbox' },
    { component: Uncontrolled, title: 'Uncontrolled Checkbox' },
    { component: Disabled, title: 'Disabled Checkbox' },
  ]
};
