import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import Checkbox from '.';

const name = '1';

storiesOf('Basic', module).add('Checkbox', () => {
  const label = text('label', 'Previous');
  const checked = boolean('checked', false);

  return (
    <Checkbox
      name={name}
      label={label}
      checked={checked}
    />
  );
});
