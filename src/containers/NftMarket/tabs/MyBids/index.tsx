/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FC, useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { fromSunToNumber } from 'utils';
import cx from 'classnames';
import { format } from 'date-fns';
import styles from '../styles.module.scss';
import {
  Button, NotActiveCardIcon, Pagination, Table, Text,
} from '../../../../components';
import { useShallowSelector, useTabHandlers } from '../../../../hooks';
import { nftMarketSelector } from '../../../../store/selectors';
import {
  nftMarketCancelBidAction,
  nftMarketGetMyBidsAction,
} from '../../../../store/nftMarket/actions';
import {
  marketURL, PAGE_ITEM_LIMIT,
} from '../../../../appConstants';
import { MyBidsCardData, NftReqDto, TableRowProps } from '../../../../types';

export const MyBidsTab: FC = () => {
  const dispatch = useDispatch();
  const { myBids } = useShallowSelector(nftMarketSelector.getState);
  const {
    page,
    setPage,
    pageCount,
    updatePage,
  } = useTabHandlers(marketURL.MARKETPLACE.MY_BIDS_LIST);

  const updatePageHandler = useCallback(() => {
    const dto: NftReqDto = { limit: PAGE_ITEM_LIMIT, skip: page * PAGE_ITEM_LIMIT };
    dispatch(nftMarketGetMyBidsAction({ limit: PAGE_ITEM_LIMIT, skip: page * PAGE_ITEM_LIMIT }));
    updatePage(dto);
  }, [dispatch, page, updatePage]);

  useEffect(() => {
    updatePageHandler();
  }, [updatePageHandler]);

  const cancelBid = useCallback((orderId: number) => {
    return () => dispatch(nftMarketCancelBidAction({ orderId }, updatePageHandler));
  }, [dispatch, updatePageHandler]);

  const col = useMemo(() => [
    {
      Header: 'Card',
      accessor: 'name',
      Cell: ({ row: { original: { url } } }: TableRowProps<MyBidsCardData>) => (
        <div className={styles.smallCardIcon}>
          <NotActiveCardIcon showShadows url={url} />
        </div>
      ),
    },
    { Header: 'Card ID', accessor: 'cardId' },
    {
      Header: 'Price',
      accessor: 'amount',
      Cell: ({ row: { original: { bidsSum } } }: TableRowProps<MyBidsCardData>) => (
        <div style={{ display: 'flex' }}>
          <Text title={fromSunToNumber(bidsSum)} className={styles.priceCol}>
            {fromSunToNumber(bidsSum)}
          </Text>
          &nbsp;
          <Text className={styles.primary}>TRX</Text>
        </div>
      ),
    },
    {
      Header: 'Active',
      accessor: 'state',
      Cell: ({ row: { original: { active } } }: TableRowProps<MyBidsCardData>) => (
        <Text className={cx({ [styles.primary]: !active })}>{active ? 'active' : 'not active'}</Text>
      ),
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ row: { original: { updatedAt } } }: TableRowProps<MyBidsCardData>) => (
        <Text>{format(new Date(updatedAt), 'dd.MM.yyyy')}</Text>
      ),
    },
    {
      Header: 'Cancel',
      accessor: 'timestamp',
      Cell: ({ row: { original: { orderIndex, active } } }: TableRowProps<MyBidsCardData>) => (
        orderIndex !== undefined && !active ?
          <Button onClick={cancelBid(orderIndex)}>Cancel bid</Button> :
          null
      ),
    },
  ], []);

  return (
    <div className={styles.wrap}>
      <Table columns={col} data={myBids} />
      <Pagination page={page} onChange={setPage} pageCount={pageCount} />
    </div>
  );
};
