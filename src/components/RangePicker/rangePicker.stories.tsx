import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, boolean } from '@storybook/addon-knobs';
import { Card } from 'components';
import RangePicker from '.';

storiesOf('Basic', module).add('RangePicker', () => {
  const label = text('Label', 'Flip bet');
  const value = number('Value', 10);
  const isVertical = boolean('Vertical', false);
  const isBtnManageVisible = boolean('With buttons', false);

  return (
    <Card style={{ width: '80%', margin: '0 auto' }}>
      <RangePicker
        label={label}
        value={value}
        isVertical={isVertical}
        isManageBtnVisible={isBtnManageVisible}
      />
    </Card>
  );
});
