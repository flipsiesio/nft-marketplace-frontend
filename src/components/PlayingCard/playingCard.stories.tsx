import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import PlayingCard from '.';

storiesOf('Basic', module).add('PlayingCard', () => {
  const isInverted = boolean('Inverted', false);
  const suit = select('Suit', {
    S: 'S',
    H: 'H',
    C: 'C',
    D: 'D',
  }, 'S');
  const rank = select('Rank', {
    A: 'A',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    J: 'J',
    Q: 'Q',
    K: 'K',
    S: 'S',
  }, '2');

  return (
    <PlayingCard suit={suit} rank={rank} isInverted={isInverted} />
  );
});
