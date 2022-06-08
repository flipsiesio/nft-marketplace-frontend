import React, { FC, useEffect } from 'react';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { nftMarketGetMarketAction } from 'store/nftMarket/actions';
import { routes } from 'appConstants';
import { TabWithFilter } from '../TabWithFilter';

const MarketTab: FC = () => {
  const dispatch = useDispatch();
  const { market } = useShallowSelector(nftMarketSelector.getState);

  useEffect(() => {
    dispatch(nftMarketGetMarketAction({ limit: 10, skip: 0 }));
  }, [dispatch]);

  return (
    <TabWithFilter link={routes.nftMarket.marketProfile.root} items={market} />
  );
};

export { MarketTab };
