import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { AxiosRequestConfig } from 'axios';
import {
  NavTabs, Pagination, Table, Text, Button, Icon,
} from '../../components';
import styles from './styles.module.scss';
import { HistoryData, TabItem, TableRowProps } from '../../types';
import { marketClient } from '../../store/api';
import { marketURL, PAGE_ITEM_LIMIT, scanTransactionUrl } from '../../appConstants';
import { fromSunToNumber } from '../../utils';

type Props = {
  isMyGallery?: boolean
  onAcceptBidClick?: (payerAddress: string, nftId: string) => void
  cardId: number
  actualOrderId?: number
  disabled?: boolean
};

type EventNames = {
  [key: string]: string
};

const eventNames: EventNames = {
  OrderCreated: 'list',
  OrderRejected: 'de-list',
  Bid: 'bid',
  OrderFilled: 'sold',
};

const getHistory = (url: string, id: number, page: number, param?: AxiosRequestConfig['params']) => {
  return marketClient.get<HistoryData[]>(url, {
    params: {
      ids: [id],
      skip: page * PAGE_ITEM_LIMIT,
      take: PAGE_ITEM_LIMIT,
      byOrder: false,
      ...param,
    },
  });
};

const getHistoryCount = (url: string, id: number, param?: AxiosRequestConfig['params']) => {
  return marketClient.get<number>(url, {
    params: {
      ids: [id],
      count: true,
      byOrder: false,
      ...param,
    },
  });
};

const tradingCol = [
  {
    Header: 'Event',
    accessor: 'name',
    Cell: ({ row: { original: { name } } }: TableRowProps<HistoryData>) => (
      <Text>
        {eventNames[name] || name}
      </Text>
    ),
  },
  { Header: 'Address', accessor: 'seller' },
  {
    Header: 'Price',
    accessor: 'amount',
    Cell: ({ row: { original: { price } } }: TableRowProps<HistoryData>) => (
      <div className={styles.flex}>
        <Text title={price === null ? 0 : fromSunToNumber(`${price}`)} className={styles.priceCol}>
          {price === null ? 0 : fromSunToNumber(`${price}`)}
        </Text>
        &nbsp;
        <Text className={styles.pink}>TRX</Text>
      </div>
    ),
  },
  {
    Header: 'Date',
    accessor: 'timestamp',
    Cell: ({ row: { original: { timestamp, transaction } } }: TableRowProps<HistoryData>) => (
      <div className={styles.flex}>
        <Text>
          {format(new Date(Number(timestamp)), 'dd.MM.yyyy')}
        </Text>
        {transaction && (
          <Button
            className={styles.transactionBtn}
            onClick={() => window.open(`${scanTransactionUrl}${transaction}`)}
          >
            <Icon className={styles.transactionIcon} icon="transactionlink" />
          </Button>
        )}
      </div>
    ),
  },
];

export const CardHistory: FC<Props> = ({
  isMyGallery,
  onAcceptBidClick,
  cardId,
  actualOrderId,
  disabled,
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
        <div className={styles.flex}>
          <Text title={amount === null ? 0 : fromSunToNumber(`${amount}`)} className={styles.priceCol}>
            {amount === null ? 0 : fromSunToNumber(`${amount}`)}
          </Text>
          &nbsp;
          <Text className={styles.pink}>TRX</Text>
        </div>
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
              {actualOrderId === orderIndex && (
                <Button
                  disabled={disabled}
                  className={styles.acceptButton}
                  onClick={onAcceptBidClick
                    ? () => onAcceptBidClick(buyer || '', `${orderIndex}`)
                    : undefined}
                >
                  {t('nftMarket.accept')}
                </Button>
              )}
            </div>
          )
      ),
    },
  ]), [onAcceptBidClick, isMyGallery, actualOrderId, disabled]);

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
              pageCount={Math.ceil(tradingCount / PAGE_ITEM_LIMIT)}
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
              pageCount={Math.ceil(bidCount / PAGE_ITEM_LIMIT)}
            />
          </div>
        ),
      },
    ]
  ), [t, bidData, tradingData, bidCount, bidPage, tradingCount, tradingPage, bidCol]);

  useEffect(() => {
    getHistory(
      marketURL.MARKETPLACE.GET_BID_HISTORY,
      cardId,
      bidPage,
      { name: ['Bid'] },
    )
      .then((res) => {
        setBidData(res.data);
      });
  }, [cardId, bidPage]);

  useEffect(() => {
    getHistory(marketURL.MARKETPLACE.GET_SALE_HISTORY, cardId, tradingPage)
      .then((res) => {
        setTradingData(res.data);
      });
  }, [cardId, tradingPage]);

  useEffect(() => {
    getHistoryCount(
      marketURL.MARKETPLACE.GET_BID_HISTORY,
      cardId,
      { name: ['Bid'] },
    ).then((res) => {
      setBidCount(res.data);
    });

    getHistoryCount(marketURL.MARKETPLACE.GET_SALE_HISTORY, cardId).then((res) => {
      setTradingCount(res.data);
    });
  }, [cardId]);

  return (
    <NavTabs shouldSearch={false} className={styles.tables} tabItems={tabItems} />
  );
};
