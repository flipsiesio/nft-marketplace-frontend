import React, { FC, useCallback } from 'react';
import { useShallowSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { nftMarketSelector } from 'store/selectors';
import { nftMarketGetGalleryAction } from 'store/nftMarket/actions';
import { routes } from 'appConstants';
import { NftReqDto } from 'types';
import { TabWithFilter } from '../TabWithFilter';

const GalleryTab: FC = () => {
  const dispatch = useDispatch();
  const { gallery } = useShallowSelector(nftMarketSelector.getState);

  const onUpdate = useCallback((data: NftReqDto) => {
    dispatch(nftMarketGetGalleryAction(data));
  }, [dispatch]);

  return (
    <TabWithFilter
      onUpdate={onUpdate}
      link={routes.nftMarket.galleryProfile.root}
      items={gallery}
    />
  );
};

export { GalleryTab };
