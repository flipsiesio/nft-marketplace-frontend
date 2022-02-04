import React, { FC, useCallback } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import type { PlayingCardProps as Props } from 'types';
import shirtImg from 'assets/img/cards/shirt.svg';
import styles from './styles.module.scss';

const PlayingCard: FC<Props> = ({
  rank = '2',
  suit = 'S',
  isInverted = false,
  className,
}) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const getImgSrc = useCallback(() => require(`assets/img/cards/${rank}-${suit}.svg`), [rank, suit]);

  return (
    <div className={cx(className)}>
      <CSSTransition
        in={isInverted}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
        addEndListener={() => {}}
      >
        <div
          className={cx(styles.flipper, {
            [styles.shirt]: isInverted,
            [styles.face]: !isInverted,
          })}
        >
          <div className={cx(styles.card, styles.back)}>
            <img
              src={shirtImg}
              alt="Card"
            />
          </div>

          <div className={cx(styles.card, styles.front)}>
            <img
              src={getImgSrc()}
              alt="Card"
            />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default PlayingCard;
