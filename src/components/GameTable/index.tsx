import React, { FC, PropsWithChildren } from 'react';
import cx from 'classnames';

import userPhoto from 'assets/img/avatar.svg';
import dealerPhoto from 'assets/img/dealerPhoto.svg';
import { ReactComponent as Table } from 'assets/img/table.svg';

import type { GameTableProps as Props } from 'types';
import GameTablePlayer from './GameTablePlayer';
import GameTableCards from './GameTableCards';
import styles from './styles.module.scss';

const GameTable: FC<PropsWithChildren<Props>> = ({
  dealer = {
    photo: dealerPhoto,
    name: 'Flipsies',
    cards: [],
    isHighlight: false,
    combination: '',
  },
  player = {
    photo: userPhoto,
    name: 'Player',
    cards: [],
    isHighlight: false,
    combination: '',
  },
  cards,
  className,
  isDeckVisible = false,
  jackpot,
}) => (
  <div className={cx(styles.section, className)}>
    <Table className={styles.table} />
    <>
      <GameTablePlayer withDeck={isDeckVisible} type="dealer" player={dealer} />
      <GameTableCards cards={cards} jackpot={jackpot} />
      <GameTablePlayer type="user" player={player} />
    </>
  </div>
);

export default GameTable;
