import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { marketClient } from '../store/api';
import { PAGE_ITEM_LIMIT } from '../appConstants';
import { CardDataForList, NftReqDto } from '../types';
import {
  fromSunToNumber, getBidPrice, getMyBidPrice, getTrxFromSun,
} from '../utils';
import { useShallowSelector } from './index';
import { tronSelector } from '../store/selectors';

export const useTabHandlers = (url: string) => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const address = useShallowSelector(tronSelector.getProp('address'));

  const updatePage = useCallback((dto: NftReqDto) => {
    marketClient.get<number>(url, {
      params: {
        ...dto,
        count: true,
      },
    }).then((res) => setPageCount(Math.ceil(res.data / PAGE_ITEM_LIMIT)));
  }, [url]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    marketClient.get<number>(url, {
      params: {
        count: true,
      },
      cancelToken: cancelToken.token,
    }).then((res) => setPageCount(Math.ceil(res.data / PAGE_ITEM_LIMIT)));

    return () => {
      cancelToken.cancel();
    };
  }, [url]);

  const getSalePrice = useCallback((item: CardDataForList) => {
    if (item.state_sale && item.state_sale.price) {
      return `${getTrxFromSun(item.state_sale.price)}`;
    }
    return '0';
  }, []);

  const getBidsPrice = useCallback((item: CardDataForList) => {
    if (item.state_bids) {
      return getBidPrice(item.state_bids);
    }
    return '0';
  }, []);

  const getMyBidsPrice = useCallback((item: CardDataForList) => {
    if (item.state_bids) {
      return getMyBidPrice(address, item.state_bids);
    }
    return '0';
  }, [address]);

  const getBidsOrSalePrice = useCallback((item: CardDataForList) => {
    if (item.state_sale) {
      return `${fromSunToNumber(item.state_sale.price)}`;
    }

    if (item.state_bids) {
      return getBidPrice(item.state_bids);
    }

    return '0';
  }, []);

  return {
    pageCount,
    getSalePrice,
    getBidsPrice,
    getBidsOrSalePrice,
    updatePage,
    page,
    setPage,
    getMyBidsPrice,
  };
};
