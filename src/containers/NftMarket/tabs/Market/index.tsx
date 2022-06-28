import React, {
  FC, useCallback,
} from 'react';
import { useShallowSelector, useTabHandlers } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { nftMarketGetMarketAction } from 'store/nftMarket/actions';
import { routes, marketURL } from 'appConstants';
import { NftReqDto } from 'types';
import { useTranslation } from 'react-i18next';
import { TabWithFilter } from '../TabWithFilter';

const MarketTab: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { market } = useShallowSelector(nftMarketSelector.getState);
  const {
    getBidsPrice,
    pageCount,
  } = useTabHandlers(marketURL.MARKETPLACE.MARKET_LIST);

  const onUpdate = useCallback((data: NftReqDto) => {
    dispatch(nftMarketGetMarketAction(data));
  }, [dispatch]);

  return (
    <TabWithFilter
      priceLabel={t('nftMarket.highestBid')}
      onUpdate={onUpdate}
      link={routes.nftMarket.marketProfile.root}
      items={market}
      getPrice={getBidsPrice}
      pageCount={pageCount}
    />
  );
};

export { MarketTab };
