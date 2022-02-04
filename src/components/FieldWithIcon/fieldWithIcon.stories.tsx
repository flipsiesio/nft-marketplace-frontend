import React from 'react';
import { storiesOf } from '@storybook/react';

import FieldWithIcon from 'components/FieldWithIcon';

storiesOf('Basic', module).add('FieldWithIcon', () => (
  <FieldWithIcon
    text="test"
    icon="telegram"
  />
));
