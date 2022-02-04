import React from 'react';
import { storiesOf } from '@storybook/react';
import { H3 } from 'components';
import Card from '.';

storiesOf('Basic', module).add('Card', () => (
  <Card>
    <H3 align="center">Let&lsquo;s go play in Poker!</H3>
  </Card>
));
