import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import {
  NavTabs, Pagination, Table, Text, Button,
} from '../../components';
import styles from './styles.module.scss';
import { HistoryData, TabItem, TableRowProps } from '../../types';
import { marketClient } from '../../store/api';
import { marketURL } from '../../appConstants';
import { fromSunToNumber } from '../../utils';

type Props = {
  isMyGallery?: boolean
  onAcceptBidClick?: (payerAddress: string, nftId: string) => void
  cardId: number
};

const PAGINATION_LIMIT = 10;

// TODO: Доделать EVENT
const tradingCol = [
  { Header: 'Event', accessor: 'name' },
  { Header: 'Address', accessor: 'seller' },
  {
    Header: 'Price',
    accessor: 'amount',
    Cell: ({ row: { original: { amount } } }: TableRowProps<HistoryData>) => (
      <Text>
        {amount === null ? 0 : fromSunToNumber(`${amount}`)}
        &nbsp;
        <span className={styles.pink}>TRX</span>
      </Text>
    ),
  },
  {
    Header: 'Date',
    accessor: 'timestamp',
    Cell: ({ row: { original: { timestamp } } }: TableRowProps<HistoryData>) => (
      <Text>
        {format(new Date(Number(timestamp)), 'dd.MM.yyyy')}
      </Text>
    ),
  },
];

export const CardHistory: FC<Props> = ({
  isMyGallery,
  onAcceptBidClick,
  cardId,
}) => {
  const [bidData, setBidData] = useState<HistoryData[]>([]);
  const [tradingData, setTradingData] = useState<HistoryData[]>([]);
  const [bidCount, setBidCount] = useState(0);
  const [tradingCount, setTradingCount] = useState(0);
  const [bidPage, setBidPage] = useState(0);
  const [tradingPage, setTradingPage] = useState(0);
  const { t } = useTranslation();

  const bidCol = useMemo(() => ([
    {
      Header: 'Number',
      accessor: 'id',
      Cell: ({ row: { index } }: TableRowProps<HistoryData>) => (
        <Text>{index + 1}</Text>
      ),
    },
    {
      Header: 'Bid',
      accessor: 'amount',
      Cell: ({ row: { original: { amount } } }: TableRowProps<HistoryData>) => (
        <Text>
          {amount === null ? 0 : fromSunToNumber(`${amount}`)}
          &nbsp;
          <span className={styles.pink}>TRX</span>
        </Text>
      ),
    },
    {
      Header: 'Address',
      accessor: 'buyer',
      Cell: ({ row: { original: { buyer, orderIndex } } }: TableRowProps<HistoryData>) => (
        !isMyGallery
          ? <Text>{buyer}</Text>
          : (
            <div className={styles.flex}>
              <Text>{buyer}</Text>
              <Button
                className={styles.acceptButton}
                onClick={onAcceptBidClick
                  ? () => onAcceptBidClick(buyer, `${orderIndex}`)
                  : undefined}
              >
                {t('nftMarket.accept')}
              </Button>
            </div>
          )
      ),
    },
  ]), [onAcceptBidClick, isMyGallery]);

  const tabItems = useMemo<TabItem[]>(() => (
    [
      {
        title: t('nftMarket.tradingHistory'),
        content: (
          <div>
            <Table
              className={styles.table}
              columns={tradingCol}
              data={tradingData}
            />
            <Pagination
              page={tradingPage}
              onChange={setTradingPage}
              pageCount={Math.ceil(tradingCount / PAGINATION_LIMIT)}
            />
          </div>
        ),
      },
      {
        title: t('nftMarket.bids'),
        content: (
          <div>
            <Table
              className={styles.table}
              columns={bidCol}
              data={bidData}
            />
            <Pagination
              page={bidPage}
              onChange={setBidPage}
              pageCount={Math.ceil(bidCount / PAGINATION_LIMIT)}
            />
          </div>
        ),
      },
    ]
  ), [t, bidData, tradingData, bidCount, bidPage, tradingCount, tradingPage, bidCol]);

  useEffect(() => {
    marketClient.get<HistoryData[]>(marketURL.MARKETPLACE.GET_BID_HISTORY, {
      params: {
        tokenId: cardId,
        offset: bidPage * PAGINATION_LIMIT,
        count: PAGINATION_LIMIT,
      },
    }).then((res) => {
      setBidData(res.data);
    });
  }, [cardId, bidPage]);

  useEffect(() => {
    marketClient.get<HistoryData[]>(marketURL.MARKETPLACE.GET_TRADE_HISTORY, {
      params: {
        tokenId: cardId,
        offset: tradingPage * PAGINATION_LIMIT,
        count: PAGINATION_LIMIT,
      },
    }).then((res) => {
      setTradingData(res.data);
    });
  }, [cardId, tradingPage]);

  useEffect(() => {
    marketClient.get<number>(marketURL.MARKETPLACE.GET_BID_HISTORY_COUNT, {
      params: {
        tokenId: cardId,
      },
    }).then((res) => {
      setBidCount(res.data);
    });

    marketClient.get<number>(marketURL.MARKETPLACE.GET_TRADE_HISTORY_COUNT, {
      params: {
        tokenId: cardId,
      },
    }).then((res) => {
      setTradingCount(res.data);
    });
  }, [cardId]);

  return (
    <NavTabs shouldSearch={false} className={styles.tables} tabItems={tabItems} />
  );
};
