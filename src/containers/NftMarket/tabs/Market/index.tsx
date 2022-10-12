import React, {
  FC, useCallback,
} from 'react';
import { useShallowSelector, useTabHandlers } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { nftMarketGetMarketAction } from 'store/nftMarket/actions';
import { routes, marketURL } from 'appConstants';
import { NftReqDto } from 'types';
import { TabWithFilter } from '../TabWithFilter';

const MarketTab: FC = () => {
  const dispatch = useDispatch();
  const { market } = useShallowSelector(nftMarketSelector.getState);
  const {
    getBidsOrSalePrice,
    pageCount,
    updatePage,
  } = useTabHandlers(marketURL.MARKETPLACE.MARKET_LIST);

  const onUpdate = useCallback((data: NftReqDto) => {
    dispatch(nftMarketGetMarketAction(data));
    updatePage(data);
  }, [dispatch, updatePage]);

  return (
    <TabWithFilter
      onUpdate={onUpdate}
      linkBid={routes.nftMarket.marketProfile.root}
      linkSale={routes.nftMarket.galleryProfile.root}
      items={market}
      getPrice={getBidsOrSalePrice}
      pageCount={pageCount}
      isSale
    />
  );
};

export { MarketTab };
