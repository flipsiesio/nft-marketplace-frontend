import React, { FC, useCallback } from 'react';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { nftMarketGetMarketAction } from 'store/nftMarket/actions';
import { routes } from 'appConstants';
import { NftReqDto } from 'types';
import { TabWithFilter } from '../TabWithFilter';

const MarketTab: FC = () => {
  const dispatch = useDispatch();
  const { market } = useShallowSelector(nftMarketSelector.getState);
  const onUpdate = useCallback((data: NftReqDto) => {
    dispatch(nftMarketGetMarketAction(data));
  }, [dispatch]);

  return (
    <TabWithFilter
      onUpdate={onUpdate}
      link={routes.nftMarket.marketProfile.root}
      items={market}
    />
  );
};

export { MarketTab };
