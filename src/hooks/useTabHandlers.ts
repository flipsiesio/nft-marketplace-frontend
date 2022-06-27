import { useCallback, useEffect, useState } from 'react';
import { marketClient } from '../store/api';
import { PAGE_ITEM_LIMIT } from '../appConstants';
import { CardDataForList } from '../types';
import { fromSunToNumber, getBidPrice, getTrxFromSun } from '../utils';

export const useTabHandlers = (url: string) => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    marketClient.get<number>(url, {
      params: {
        count: true,
      },
    }).then((res) => setPageCount(Math.ceil(res.data / PAGE_ITEM_LIMIT)));
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
    page,
    setPage,
  };
};
