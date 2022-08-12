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
import {
  HistoryData,
  NftDto, TabItem, TableRowProps, BidCardState,
  BidData,
} from '../../types';
import { marketClient } from '../../store/api';
import { marketURL, PAGE_ITEM_LIMIT, scanTransactionUrl } from '../../appConstants';
import { fromSunToNumber } from '../../utils';

export type AcceptBidData = {
  payerAddress: string
  orderId: string
  price: number | null
};

type Props = {
  isMyGallery?: boolean
  onAcceptBidClick?: (data: AcceptBidData) => void
  selectedNft: NftDto
  actualOrderId?: number
  disabled?: boolean
  showBid?: boolean
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

const getBidData = (id: number, page: number, param?: AxiosRequestConfig['params']) => {
  return marketClient.get<BidCardState>(marketURL.MARKETPLACE.GET_ACTUAL_BIDS, {
    params: {
      ids: [id],
      skip: page * PAGE_ITEM_LIMIT,
      take: PAGE_ITEM_LIMIT,
      byOrder: false,
      order: 'ASC',
      ...param,
    },
  });
};

const getHistory = (url: string, id: number, page: number, param?: AxiosRequestConfig['params']) => {
  return marketClient.get<HistoryData[]>(url, {
    params: {
      ids: [id],
      skip: page * PAGE_ITEM_LIMIT,
      take: PAGE_ITEM_LIMIT,
      byOrder: false,
      order: 'ASC',
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
      order: 'ASC',
      ...param,
    },
  });
};

const getTradingColName = (name: string | null, method: string) => {
  if (name === null && method.includes('mintRandom')) {
    return 'mint';
  }

  if (name !== null) {
    return eventNames[name] || name;
  }

  return '';
};

const tradingCol = [
  {
    Header: 'Event',
    accessor: 'name',
    Cell: ({ row: { original: { name, method } } }: TableRowProps<HistoryData>) => (
      <Text>
        {getTradingColName(name, method)}
      </Text>
    ),
  },
  {
    Header: 'Address',
    accessor: 'seller',
    Cell: ({ row: { original: { seller, address } } }: TableRowProps<HistoryData>) => (
      <Text>
        {seller || address}
      </Text>
    ),
  },
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
  selectedNft,
  actualOrderId,
  disabled,
  showBid = true,
}) => {
  const [bids, setBids] = useState<BidData[]>([]);
  const [bidCard, setBidCard] = useState<BidCardState>();
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
      Cell: ({ row: { index } }: TableRowProps<BidData>) => (
        <Text>{index + 1}</Text>
      ),
    },
    {
      Header: 'Bid',
      accessor: 'amount',
      Cell: ({ row: { original: { price } } }: TableRowProps<BidData>) => (
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
      Header: 'Address',
      accessor: 'buyer',
      Cell: ({ row: { original: { buyer } } }: TableRowProps<BidData>) => (
        <Text>{buyer}</Text>
      ),
    },
    {
      Header: '',
      accessor: 'orderIndex',
      Cell: ({ row: { original: { buyer, price } } }: TableRowProps<BidData>) => (
        <>
          {actualOrderId === bidCard?.orderIndex && isMyGallery && (
            <Button
              disabled={disabled}
              className={styles.acceptButton}
              onClick={onAcceptBidClick
                ? () => onAcceptBidClick({
                  orderId: `${bidCard?.orderIndex}`,
                  payerAddress: buyer || '',
                  price,
                })
                : undefined}
            >
              {t('nftMarket.accept')}
            </Button>
          )}
        </>
      ),
    },
  ]), [onAcceptBidClick, isMyGallery, actualOrderId, disabled]);

  const tabItems = useMemo<TabItem[]>(() => {
    const tabs = [
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
    ];

    if (showBid) {
      tabs.push({
        title: t('nftMarket.bids'),
        content: (
          <div>
            <Table
              className={styles.table}
              columns={bidCol}
              data={bids}
            />
            <Pagination
              page={bidPage}
              onChange={setBidPage}
              pageCount={Math.ceil(bidCount / PAGE_ITEM_LIMIT)}
            />
          </div>
        ),
      });
    }

    return tabs;
  }, [
    t,
    bids, bidCard,
    tradingData,
    bidCount, bidPage,
    tradingCount,
    tradingPage,
    bidCol,
    showBid,
  ]);

  useEffect(() => {
    if (!showBid) return;
    getBidData(
      selectedNft.cardId,
      bidPage,
      { name: ['Bid'] },
    )
      .then((res) => {
        setBids(Object.values(res.data.bids));
        setBidCard(res.data);
      });
  }, [selectedNft, bidPage, showBid]);

  useEffect(() => {
    if (!selectedNft) return;
    getHistory(
      marketURL.MARKETPLACE.GET_SALE_HISTORY,
      selectedNft.cardId,
      tradingPage,
      { watchBids: false },
    )
      .then((res) => {
        setTradingData(res.data);
      });
  }, [selectedNft, tradingPage]);

  useEffect(() => {
    if (!showBid) return;
    getHistoryCount(
      marketURL.MARKETPLACE.GET_ACTUAL_BIDS,
      selectedNft.cardId,
      { name: ['Bid'] },
    ).then((res) => {
      setBidCount(res.data);
    });

    getHistoryCount(
      marketURL.MARKETPLACE.GET_SALE_HISTORY,
      selectedNft.cardId,
      { watchBids: false },
    ).then((res) => {
      setTradingCount(res.data);
    });
  }, [selectedNft, showBid]);

  return (
    <NavTabs shouldSearch={false} className={styles.tables} tabItems={tabItems} />
  );
};
