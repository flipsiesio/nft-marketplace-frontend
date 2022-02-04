import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { PlayingCard, Text } from 'components';
import type { GameTableCard } from 'types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { TrxUsdConverter } from 'containers';
import styles from './styles.module.scss';

type Props = {
  cards: GameTableCard[],
  jackpot?: number,
};

const GameTableCards: FC<Props> = ({ cards, jackpot = undefined }) => {
  const { t } = useTranslation();

  return(
    <div className={styles.wrap}>
      <TransitionGroup component={null} inlist={cards.length}>
        {cards.map(({
          suit,
          rank,
          isInverted,
          className,
        }) => (
          <CSSTransition
            key={`${suit}-${rank}`}
            timeout={500}
            classNames={{
              enter: styles.enter,
            }}
          >
            <PlayingCard
              suit={suit}
              rank={rank}
              isInverted={isInverted}
              className={cx(styles.card, className)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>

      {jackpot !== undefined && (
      <div className={styles.jackpot}>
        <Text bold tag="span" className={styles.royalFlush}>{t('game.jackpot')}: {t('combinations.royalFlush')}</Text>
        <Text bold tag="span" className={styles.jackpotUsd}>{jackpot || 0} TRX/<TrxUsdConverter trx={jackpot || 0} /></Text>
      </div>
      )}
    </div>
  );
};

export default GameTableCards;
