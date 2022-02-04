import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { Card } from 'components';
import Switcher from '.';

storiesOf('Basic', module).add('Switcher', () => {
  const checked = boolean('Checked', false);
  const leftLabel = text('Left label', 'Red');
  const rightLabel = text('Right label', 'Black');

  return (
    <Card>
      <Switcher
        checked={checked}
        leftLabel={leftLabel}
        rightLabel={rightLabel}
      />
    </Card>
  );
});
