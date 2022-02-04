import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import ProgressBar from '.';

storiesOf('Basic', module).add('ProgressBar', () => {
  const value = number('Value (percent)', 50);
  const transitionTimeout = number('Transition timeout (ms)', 200);
  return <ProgressBar value={value} transitionTimeout={transitionTimeout} />;
});
