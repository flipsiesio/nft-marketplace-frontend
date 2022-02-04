import React, { useMemo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  H3,
  Text,
  PlayingCard,
  Modal,
} from 'components';
import type {
  PlayingCardRank as Rank,
  PlayingCardSuit as Suit,
} from 'types';
import styles from './styles.module.scss';

type Combination = {
  id: number,
  name: string,
  cards: Array<{ rank: Rank, suit: Suit }>,
};

type Props = {
  isOpen: boolean,
  onClose: () => void,
};

const GameCombinations: FC<Props> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  const COMBINATIONS: Combination[] = useMemo(() => [
    {
      id: 1,
      name: t('combinations.royalFlush'),
      cards: [
        {
          rank: 'A',
          suit: 'H',
        },
        {
          rank: 'K',
          suit: 'H',
        },
        {
          rank: 'Q',
          suit: 'H',
        },
        {
          rank: 'J',
          suit: 'H',
        },
        {
          rank: '10',
          suit: 'H',
        },
      ],
    },
    {
      id: 2,
      name: t('combinations.straightFlush'),
      cards: [
        {
          rank: 'J',
          suit: 'S',
        },
        {
          rank: '10',
          suit: 'S',
        },
        {
          rank: '9',
          suit: 'S',
        },
        {
          rank: '8',
          suit: 'S',
        },
        {
          rank: '7',
          suit: 'S',
        },
      ],
    },
    {
      id: 3,
      name: t('combinations.quads'),
      cards: [
        {
          rank: 'A',
          suit: 'S',
        },
        {
          rank: 'A',
          suit: 'H',
        },
        {
          rank: 'A',
          suit: 'C',
        },
        {
          rank: 'A',
          suit: 'D',
        },
        {
          rank: 'K',
          suit: 'H',
        },
      ],
    },
    {
      id: 4,
      name: t('combinations.fullHouse'),
      cards: [
        {
          rank: 'K',
          suit: 'S',
        },
        {
          rank: 'K',
          suit: 'C',
        },
        {
          rank: 'K',
          suit: 'D',
        },
        {
          rank: '10',
          suit: 'S',
        },
        {
          rank: '10',
          suit: 'D',
        },
      ],
    },
    {
      id: 5,
      name: t('combinations.flush'),
      cards: [
        {
          rank: 'Q',
          suit: 'S',
        },
        {
          rank: '6',
          suit: 'S',
        },
        {
          rank: '5',
          suit: 'S',
        },
        {
          rank: '3',
          suit: 'S',
        },
        {
          rank: '2',
          suit: 'S',
        },
      ],
    },
    {
      id: 6,
      name: t('combinations.straight'),
      cards: [
        {
          rank: '10',
          suit: 'D',
        },
        {
          rank: '9',
          suit: 'S',
        },
        {
          rank: '8',
          suit: 'H',
        },
        {
          rank: '7',
          suit: 'C',
        },
        {
          rank: '6',
          suit: 'H',
        },
      ],
    },
    {
      id: 7,
      name: t('combinations.threeOfKind'),
      cards: [
        {
          rank: 'K',
          suit: 'D',
        },
        {
          rank: 'K',
          suit: 'C',
        },
        {
          rank: 'K',
          suit: 'S',
        },
        {
          rank: 'J',
          suit: 'D',
        },
        {
          rank: '10',
          suit: 'S',
        },
      ],
    },
    {
      id: 8,
      name: t('combinations.twoPair'),
      cards: [
        {
          rank: 'Q',
          suit: 'H',
        },
        {
          rank: 'Q',
          suit: 'S',
        },
        {
          rank: '5',
          suit: 'H',
        },
        {
          rank: '5',
          suit: 'C',
        },
        {
          rank: '6',
          suit: 'D',
        },
      ],
    },
    {
      id: 9,
      name: t('combinations.pair'),
      cards: [
        {
          rank: 'K',
          suit: 'C',
        },
        {
          rank: 'K',
          suit: 'D',
        },
        {
          rank: '4',
          suit: 'D',
        },
        {
          rank: '3',
          suit: 'D',
        },
        {
          rank: '2',
          suit: 'H',
        },
      ],
    },
    {
      id: 10,
      name: t('combinations.highCard'),
      cards: [
        {
          rank: 'A',
          suit: 'H',
        },
        {
          rank: '5',
          suit: 'C',
        },
        {
          rank: '10',
          suit: 'S',
        },
        {
          rank: '6',
          suit: 'D',
        },
        {
          rank: '7',
          suit: 'H',
        },
      ],
    },
  ], [t]);

  return (
    <Modal
      isOpen={isOpen}
      classNameContent={styles.modalContent}
      onClose={onClose}
      onAfterOpen={() => {
        document.body.classList.add('overflow');
      }}
      onAfterClose={() => {
        document.body.classList.remove('overflow');
      }}
    >
      <Card className={styles.wrap}>
        <H3 className={styles.title} align="center">Hand Rankings</H3>

        <ul className={styles.list}>
          {COMBINATIONS.map(({ id, name, cards }, index) => (
            <li key={id} className={styles.combination}>
              <Text
                size="big"
                bold
                align="center"
                className={styles.name}
              >
                {`${index + 1}. ${name}`}
              </Text>

              <div className={styles.cards}>
                {cards.map(({ rank, suit }) => (
                  <PlayingCard
                    key={`${rank}-${suit}`}
                    rank={rank}
                    suit={suit}
                    className={styles.card}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </Modal>
  );
};

export default GameCombinations;
