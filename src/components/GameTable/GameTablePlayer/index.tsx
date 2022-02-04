import React, { FC, useCallback } from 'react';
import cx from 'classnames';
import { PlayingCard, Text } from 'components';
import type {
  GameTablePlayer as Player,
} from 'types';
import { TrxUsdConverter } from 'containers';
import defaultAvatar from 'assets/img/king.svg';
import userChips from 'assets/img/userChips.svg';
import dealerAvatar from 'assets/img/avatar-dealer.svg';
import deckImg from 'assets/img/deck.svg';
import styles from './styles.module.scss';

type Props = {
  type: 'dealer' | 'user',
  player: Player,
  className?: string,
  withDeck?: boolean,
};

const GameTablePlayer: FC<Props> = ({
  type,
  player,
  className,
  withDeck,
}) => {
  const getPhoto = useCallback(() => {
    if (type === 'user') return player.photo || defaultAvatar;
    return dealerAvatar;
  }, [type]);

  return (
    <>
      <div
        className={cx(
          styles.player,
          styles[type],
          className,
        )}
      >
        {withDeck && (
          <img
            className={styles.deck}
            src={deckImg}
            alt="Deck of cards"
          />
        )}
        <div className={cx(styles.wrap, { [styles.winner]: player.isHighlight })}>
          <div className={styles.photo}>
            <img src={getPhoto()} alt={player?.name} />
          </div>
          <div className={styles.info}>
            <Text bold className={styles.name}>{player?.name || 'Player'}</Text>
            {player.balance && (
              <Text
                bold
                className={cx({
                  [styles.userBalance]: type === 'user',
                  [styles.dealerBalance]: type === 'dealer',
                })}
              >
                <Text tag="span" color="success">{player.balance} TRX </Text>
                <Text tag="span" color="secondary">/ <TrxUsdConverter trx={player.balance} /></Text>
              </Text>
            )}

          </div>
        </div>

        <div className={styles.cards}>
          {player.combination && (
            <Text
              align="center"
              color={player.isHighlight ? 'secondary' : 'white'}
              bold
              className={cx(
                styles.combinations,
                {
                  [styles.combinationsDealer]: type === 'dealer',
                  [styles.playerCombinations]: type === 'user',
                },
              )}
            >
              {player.combination}
            </Text>
          )}

          {player?.cards.length ? (
            player.cards.map(({
              rank,
              suit,
              isInverted,
              className: classNameCard,
            }) => (
              <PlayingCard
                key={`${rank}-${suit}`}
                className={cx(styles.card, classNameCard)}
                rank={rank}
                suit={suit}
                isInverted={isInverted}
              />
            ))
          ) : (
            [1, 2].map((el) => (
              <PlayingCard
                key={el}
                className={styles.card}
                isInverted
              />
            ))
          )}
        </div>
      </div>

      <div className={cx(styles.chips, {
        [styles.userChips]: type === 'user',
        [styles.dealerChips]: type === 'dealer',
      })}
      >
        <img src={userChips} alt={`${type} chips`} />
      </div>
    </>
  );
};

export default GameTablePlayer;
