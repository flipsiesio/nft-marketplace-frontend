/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FC, useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { fromWeiToNumber } from 'utils';
import cx from 'classnames';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styles from '../styles.module.scss';
import {
  Button, NotActiveCardIcon, Pagination, Table, Text, Link,
} from '../../../../components';
import { useShallowSelector, useTabHandlers } from '../../../../hooks';
import { nftMarketSelector, walletSelectors } from '../../../../store/selectors';
import {
  nftMarketCancelBidAction,
  nftMarketGetMyBidsAction, nftMarketSelectProfileAction,
} from '../../../../store/nftMarket/actions';
import {
  marketURL, PAGE_ITEM_LIMIT, routes,
} from '../../../../appConstants';
import { MyBidsCardData, NftReqDto, TableRowProps } from '../../../../types';

type PriceProps = Pick<MyBidsCardData, 'bids'>;

const Price: FC<PriceProps> = ({ bids }) => {
  const address = useShallowSelector(walletSelectors.getProp('address'));
  const price = useMemo(() => {
    return Object
      .entries(bids)
      .filter(([key]) => key === address)
      .map(([, value]) => value.price)
      .reduce((val1, val2) => val1 + val2, 0);
  }, [bids, address]);

  return (
    <div style={{ display: 'flex' }}>
      <Text title={fromWeiToNumber(`${price}`)} className={styles.priceCol}>
        {fromWeiToNumber(`${price}`)}
      </Text>
      &nbsp;
      <Text className={styles.primary}>TRX</Text>
    </div>
  );
};

type DateColProps = Pick<MyBidsCardData, 'bids'>;

const DateCol: FC<DateColProps> = ({ bids }) => {
  const address = useShallowSelector(walletSelectors.getProp('address'));
  const date = useMemo(() => {
    const filteredBids = Object
      .entries(bids)
      .filter(([key]) => key === address)
      .map(([, value]) => value);

    if (filteredBids.length === 0) {
      return 0;
    }

    const { timestamp } = filteredBids[filteredBids.length - 1];
    return Number(timestamp);
  }, [bids, address]);

  return (
    <Text>{date > 0 ? format(new Date(date), 'dd.MM.yyyy') : ''}</Text>
  );
};

export const MyBidsTab: FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
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

  const onLinkClick = useCallback((id: number) => {
    return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(nftMarketSelectProfileAction(undefined));
      history.push({
        pathname: routes.nftMarket.marketProfile.root,
        search: `?id=${id}`,
      });
    };
  }, [dispatch]);

  const col = useMemo(() => [
    {
      Header: 'Card',
      accessor: 'name',
      Cell: ({ row: { original: { url, tokenId, active } } }: TableRowProps<MyBidsCardData>) => (
        <div className={styles.smallCardIcon}>
          {active && (
            <Link to={`${routes.nftMarket.myBidsProfile.root}?id=${tokenId}`} onClick={onLinkClick(tokenId)}>
              <NotActiveCardIcon showShadows url={url} />
            </Link>
          )}
          {!active && <NotActiveCardIcon showShadows url={url} />}
        </div>
      ),
    },
    { Header: 'Card ID', accessor: 'cardId' },
    {
      Header: 'Price',
      accessor: 'amount',
      Cell: ({ row: { original: { bids } } }: TableRowProps<MyBidsCardData>) => (
        <Price bids={bids} />
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
      Cell: ({ row: { original: { bids } } }: TableRowProps<MyBidsCardData>) => (
        <DateCol bids={bids} />
      ),
    },
    {
      Header: 'Cancel',
      accessor: 'timestamp',
      Cell: ({ row: { original: { orderIndex, active } } }: TableRowProps<MyBidsCardData>) => (
        orderIndex !== undefined && !active ?
          <Button onClick={cancelBid(orderIndex)}>{t('nftMarket.cancelBid')}</Button> :
          null
      ),
    },
  ], [cancelBid, onLinkClick]);

  return (
    <div className={styles.wrap}>
      <Table columns={col} data={myBids} />
      <Pagination page={page} onChange={setPage} pageCount={pageCount} />
    </div>
  );
};
