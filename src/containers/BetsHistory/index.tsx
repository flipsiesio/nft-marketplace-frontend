import React, {
  useMemo,
  useState,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { betsHistoryGetDataAction } from 'store/betsHistory/actions';
import { gameClaimAction } from 'store/game/actions';
import { useFormik } from 'formik';
import {
  Table,
  H3,
  Modal,
  Button,
  Text,
  Copy,
} from 'components';
import { getAmountSum, getDateFormat, roundUpNumber } from 'utils';
import { useShallowSelector } from 'hooks';
import { betsHistorySelector, gameSelector, uiSelector } from 'store/selectors';
import { GameActionTypes } from 'store/game/actionTypes';
import { GAME_TYPE, RequestStatus } from 'appConstants';
import type {
  TableSortBy,
  Game,
  TableCell,
} from 'types';
import styles from './styles.module.scss';

const PAGE_SIZE = 5;

type Values = {
  sortState: TableSortBy,
  page: number,
};

const initialValues: Values = {
  sortState: [],
  page: 0,
};

const BetsHistory = () => {
  const dispatch = useDispatch();
  const [
    randomOrgInfo,
    setRandomOrgInfo,
  ] = useState<null | { signature: string, data: string }>(null);
  const { t } = useTranslation();
  const { bets, count } = useShallowSelector(betsHistorySelector.getState);
  const claimLoading = useShallowSelector(gameSelector.getProp('claimLoading'));
  const claimReqStatus = useShallowSelector(uiSelector.getProp(GameActionTypes.CLAIM));

  const {
    values,
    handleChange,
    handleSubmit,
  } = useFormik<Values>({
    initialValues,
    onSubmit: (obj) => {
      const offset = PAGE_SIZE * obj.page;
      let order: 'desc' | 'asc' = 'desc';
      let sort: string = '';
      if (obj.sortState.length > 0) {
        const [{ id, desc }] = obj.sortState;
        sort = id;
        order = desc ? 'desc' : 'asc';
      }
      dispatch(betsHistoryGetDataAction({
        limit: PAGE_SIZE,
        offset,
        order: sort ? order : undefined,
        sortBy: sort || undefined,
      }));
    },
  });

  useEffect(() => {
    if (claimReqStatus === RequestStatus.SUCCESS) {
      handleSubmit();
    }
  }, [claimReqStatus]);

  const columns = useMemo(() => [
    {
      Header: `${t('betsHistory.bet')} (trx)`,
      accessor: 'bet',
      disableSortBy: true,
      width: '15%',
      Cell: ({ row }: TableCell<Game>) => {
        const bet = Number(window.tronWeb.fromSun(row.original.bet));
        const betColor = Number(window.tronWeb.fromSun(row.original.betColor));
        return bet + betColor;
      },
    },
    {
      Header: `${t('betsHistory.payout')} (trx)`,
      accessor: 'amount',
      id: 'amount',
      disableSortBy: true,
      Cell: ({ row }: TableCell<Game>) => {
        const { winPokerAmount, winColorAmount } = row.original;
        const sum = getAmountSum(winPokerAmount, winColorAmount);
        return roundUpNumber(sum);
      },
      width: '20%',
    },
    {
      Header: t('betsHistory.flip'),
      accessor: 'result',
      disableSortBy: true,
      width: '10%',
      style: {
        textTransform: 'capitalize',
      },
      Cell: ({ row }: TableCell<Game>) => {
        return (
          <span className={styles.rowCapitalize}>
            {GAME_TYPE[row.original.result]}
          </span>
        );
      },
    },
    {
      Header: t('betsHistory.color'),
      width: '10%',
      disableSortBy: true,
      Cell: ({ row }: TableCell<Game>) => {
        const betColor = Number(window.tronWeb.fromSun(row.original.betColor));
        const winColorAmount = Number(window.tronWeb.fromSun(row.original.winColorAmount));
        if (betColor === 0) return '-';
        if (betColor > 0 && winColorAmount) return 'Win';
        return 'Lost';
      },
    },
    {
      Header: t('betsHistory.date'),
      accessor: 'createdAt',
      id: 'createdAt',
      width: '25%',
      Cell: ({ row }: TableCell<Game>) => {
        return getDateFormat(new Date(row.original.createdAt), 'dd MMMM / hh:mm a');
      },
    },
    {
      Header: 'Random.org',
      id: 'randomOrg',
      width: '10%',
      disableSortBy: true,
      Cell: ({ row }: TableCell<Game>) => {
        const { randomOrgData } = row.original;

        return randomOrgData?.signature ? (
          <Button
            size="small"
            icon="question"
            className={styles.randomOrgButton}
            onClick={() => setRandomOrgInfo({
              signature: randomOrgData.signature,
              data: JSON.stringify(randomOrgData.random),
            })}
          >
            More
          </Button>
        ) : null;
      },
    },
    {
      Header: () => null,
      id: 'claim',
      width: '10%',
      disableSortBy: true,
      Cell: ({ row }: TableCell<Game>) => {
        const {
          isClaimed,
          requestId,
          winColorAmount,
          winPokerAmount,
        } = row.original;
        const isLoading = claimLoading.includes(requestId);
        const amount = getAmountSum(winColorAmount, winPokerAmount);

        if (isClaimed || amount <= 0) return null;

        return (
          <Button
            size="tiny"
            use="rounded"
            disabled={isLoading}
            className={styles.claimBtn}
            onClick={() => dispatch(gameClaimAction(requestId))}
          >
            {isLoading ? 'Loading...' : 'Claim'}
          </Button>
        );
      },
    },
  ], [bets, t, claimLoading]);

  return (
    <>
      <H3 className={styles.title}>{t('betsHistory.title')}</H3>
      <Table
        columns={columns}
        data={bets}
        withPagination
        withSorting
        count={count}
        initialSortBy={initialValues.sortState}
        onSortBy={(value: TableSortBy) => {
          handleChange({
            target: {
              name: 'sortState',
              value,
            },
          });
          handleSubmit();
        }}
        pageSize={PAGE_SIZE}
        forcePage={values.page}
        onPageChange={(selected) => {
          handleChange({
            target: {
              name: 'page',
              value: selected,
            },
          });
          handleSubmit();
        }}
      />

      <Modal
        isOpen={randomOrgInfo !== null}
        className={styles.randomOrgModal}
        onClose={() => setRandomOrgInfo(null)}
      >
        <Text bold size="big" align="center" className={styles.randomOrgModalTitle}>
          You can verify the authenticity of true random data signed by RANDOM.ORG <a href="https://api.random.org/signatures/form" target="_blank" rel="noopener noreferrer">here</a>
        </Text>
        <div className={styles.formGroup}>
          <Text color="gray" className={styles.formGroupLabel}>Random</Text>
          <Copy value={randomOrgInfo?.data || ''} />
        </div>

        <div className={styles.formGroup}>
          <Text color="gray" className={styles.formGroupLabel}>Signature</Text>
          <Copy value={randomOrgInfo?.signature || ''} />
        </div>
      </Modal>
    </>
  );
};

export default BetsHistory;
