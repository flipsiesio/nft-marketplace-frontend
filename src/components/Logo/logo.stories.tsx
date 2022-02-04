import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Logo from '.';

storiesOf('Basic', module).add('Logo', () => {
  const view = select('View', {
    holdem: 'holdem',
    flipsies: 'flipsies',
  }, 'flipsies');

  return <Logo view={view} />;
});
