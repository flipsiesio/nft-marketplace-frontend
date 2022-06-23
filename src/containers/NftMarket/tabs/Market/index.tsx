import React, { FC, useCallback } from 'react';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { nftMarketGetMarketAction } from 'store/nftMarket/actions';
import { routes } from 'appConstants';
import { CardDataForList, NftReqDto } from 'types';
import { TabWithFilter } from '../TabWithFilter';
import { getBidPrice } from '../../../../utils';

const MarketTab: FC = () => {
  const dispatch = useDispatch();
  const { market } = useShallowSelector(nftMarketSelector.getState);

  const onUpdate = useCallback((data: NftReqDto) => {
    dispatch(nftMarketGetMarketAction(data));
  }, [dispatch]);

  const getPrice = useCallback((item: CardDataForList) => {
    if (item.state_bids) {
      return getBidPrice(item.state_bids);
    }
    return '0';
  }, []);

  return (
    <TabWithFilter
      onUpdate={onUpdate}
      link={routes.nftMarket.marketProfile.root}
      items={market}
      getPrice={getPrice}
    />
  );
};

export { MarketTab };
