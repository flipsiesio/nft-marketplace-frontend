import React, { FC, useEffect, useMemo } from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { gameSelector } from 'store/selectors';
import { gameGetPreviousAction } from 'store/game/actions';
import { useShallowSelector } from 'hooks';
import { getAmountSum } from 'utils';
import {
  Table,
  Copy,
  Icon,
  Text,
} from 'components';
import Jdenticon from 'react-jdenticon';
import type { TableCell, Game } from 'types';
import styles from './styles.module.scss';

type Props = {
  className?: string,
};

const GamePreviousGames: FC<Props> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const data = useShallowSelector(gameSelector.getProp('previousGames'));

  useEffect(() => {
    dispatch(gameGetPreviousAction());
  }, []);

  const columns = useMemo(() => [
    {
      Header: 'tx',
      accessor: 'transactionHash',
      Cell: ({ row }: TableCell<Game>) => {
        const { txFinish } = row.original;
        return <Copy value={txFinish} className={styles.hash} />;
      },
    },
    {
      Header: 'Address',
      accessor: 'userAddress',
      width: '33%',
      Cell: ({ row }: TableCell<Game>) => {
        const { userAddress } = row.original;
        const convertedAddress = window.tronWeb.address.fromHex(userAddress);
        return (
          <div className={styles.user}>
            <div className={styles.userAvatar}>
              <Jdenticon size="24" value={convertedAddress} />
            </div>
            <Copy className={styles.userAddress} value={convertedAddress} />
          </div>
        );
      },
    },
    {
      Header: 'Gain',
      width: '33%',
      accessor: 'amount',
      Cell: ({ row }: TableCell<Game>) => {
        const {
          winColorAmount,
          winPokerAmount,
          bet,
          betColor,
        } = row.original;
        const amount = getAmountSum(winColorAmount, winPokerAmount);
        const betTotal = getAmountSum(bet, betColor);
        const value = amount - betTotal;
        return (
          <div className={styles.amount}>
            <span className={styles.amountIcon}>
              <Icon icon="triangle" />
            </span>
            <Text tag="p" bold>
              <Text tag="span" color={value < 0 ? 'error' : 'success'}>
                {value.toFixed(2)}
              </Text>
              &ensp;
              <Text tag="span">TRX</Text>
            </Text>
          </div>
        );
      },
    },
  ], [data]);

  return (
    <Table
      columns={columns}
      data={data}
      withPagination={false}
      classNameTh={styles.th}
      classNameRow={styles.row}
      className={cx(styles.table, className)}
    />
  );
};

export default GamePreviousGames;
