import React from 'react';
import { Router } from 'react-router-dom';
import { history } from 'utils';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import BackLink from '.';

storiesOf('Basic', module).add('BackLink', () => {
  const label = text('Label', 'Back to the game');

  return (
    <Router history={history}>
      <BackLink
        label={label}
      />
    </Router>
  );
});
