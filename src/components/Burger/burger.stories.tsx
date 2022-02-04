import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Burger from '.';

storiesOf('Basic', module).add('Burger', () => {
  const isActive = boolean('isActive', false);
  const onClick = action('click');

  return <Burger isActive={isActive} onClick={onClick} />;
});
