import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { nftMarketGetMarketAction } from 'store/nftMarket/actions';
import { marketURL, PAGE_ITEM_LIMIT, routes } from 'appConstants';
import { CardDataForList, NftReqDto } from 'types';
import { TabWithFilter } from '../TabWithFilter';
import { getBidPrice } from '../../../../utils';
import { marketClient } from '../../../../store/api';

const MarketTab: FC = () => {
  const dispatch = useDispatch();
  const { market } = useShallowSelector(nftMarketSelector.getState);
  const [pageCount, setPageCount] = useState(0);

  const onUpdate = useCallback((data: NftReqDto) => {
    dispatch(nftMarketGetMarketAction(data));
  }, [dispatch]);

  const getPrice = useCallback((item: CardDataForList) => {
    if (item.state_bids) {
      return getBidPrice(item.state_bids);
    }
    return '0';
  }, []);

  useEffect(() => {
    marketClient.get<number>(marketURL.MARKETPLACE.MARKET_LIST, {
      params: {
        count: true,
      },
    }).then((res) => setPageCount(Math.ceil(res.data / PAGE_ITEM_LIMIT)));
  }, []);

  return (
    <TabWithFilter
      onUpdate={onUpdate}
      link={routes.nftMarket.marketProfile.root}
      items={market}
      getPrice={getPrice}
      pageCount={pageCount}
    />
  );
};

export { MarketTab };
