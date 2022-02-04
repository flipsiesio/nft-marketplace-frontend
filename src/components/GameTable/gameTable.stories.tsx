import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import type { GameTableCard } from 'types';
import GameTable from '.';

storiesOf('Poker', module).add('Game Table', () => {
  const isInverted = boolean('Inverted cards', false);
  const isDeckVisible = boolean('Deck visible', true);
  const withCombinationsVisible = boolean('Combinations visible', false);
  const isPLayerHighlight = boolean('Player highlight', false);
  const cards: GameTableCard[] = [
    {
      suit: 'S',
      rank: 'A',
      isInverted,
    },
    {
      suit: 'H',
      rank: 'A',
      isInverted,
    },
    {
      suit: 'C',
      rank: 'A',
      isInverted,
    },
    {
      suit: 'D',
      rank: 'A',
      isInverted,
    },
    {
      suit: 'H',
      rank: '2',
      isInverted,
    },
  ];

  const playerCards: GameTableCard[] = [
    {
      suit: 'S',
      rank: '2',
      isInverted,
    },
    {
      suit: 'S',
      rank: '3',
      isInverted,
    },
  ];

  const dealerCards: GameTableCard[] = [
    {
      suit: 'H',
      rank: '3',
      isInverted,
    },
    {
      suit: 'H',
      rank: '5',
      isInverted,
    },
  ];

  return (
    <div style={{ maxHeight: 600 }}>
      <GameTable
        cards={cards}
        isDeckVisible={isDeckVisible}
        player={{
          name: 'Player',
          cards: playerCards,
          combination: withCombinationsVisible ? 'Flush' : '',
          isHighlight: isPLayerHighlight,
        }}
        dealer={{
          name: 'Flipsies',
          cards: dealerCards,
          combination: withCombinationsVisible ? 'High card' : '',
        }}
      />
    </div>
  );
});
