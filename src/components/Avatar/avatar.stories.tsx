import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Avatar from '.';

storiesOf('Basic', module).add('Avatar', () => {
  const type = select('Type', {
    player: 'player',
    dealer: 'dealer',
  }, 'player');

  return <Avatar type={type} />;
});
