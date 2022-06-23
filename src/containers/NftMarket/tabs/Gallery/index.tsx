import React, { FC, useCallback } from 'react';
import { useShallowSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { nftMarketSelector } from 'store/selectors';
import { nftMarketGetGalleryAction } from 'store/nftMarket/actions';
import { routes } from 'appConstants';
import { CardDataForList, NftReqDto } from 'types';
import { TabWithFilter } from '../TabWithFilter';
import { getTrxFromSun } from '../../../../utils';

const GalleryTab: FC = () => {
  const dispatch = useDispatch();
  const { gallery } = useShallowSelector(nftMarketSelector.getState);

  const onUpdate = useCallback((data: NftReqDto) => {
    dispatch(nftMarketGetGalleryAction(data));
  }, [dispatch]);

  const getPrice = useCallback((item: CardDataForList) => {
    if (item.state_sale && item.state_sale.price) {
      return `${getTrxFromSun(item.state_sale.price)}`;
    }
    return '0';
  }, []);

  return (
    <TabWithFilter
      onUpdate={onUpdate}
      link={routes.nftMarket.galleryProfile.root}
      items={gallery}
      getPrice={getPrice}
    />
  );
};

export { GalleryTab };
