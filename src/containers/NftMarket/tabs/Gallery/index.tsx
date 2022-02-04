import React, { FC, useEffect } from 'react';
import { useShallowSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { nftMarketSelector } from 'store/selectors';
import { nftMarketGetGalleryAction } from 'store/nftMarket/actions';
import { routes } from 'appConstants';
import { TabWithFilter } from '../TabWithFilter';

const GalleryTab: FC = () => {
  const dispatch = useDispatch();
  const { gallery } = useShallowSelector(nftMarketSelector.getState);

  useEffect(() => {
    if (!gallery.length) {
      dispatch(nftMarketGetGalleryAction());
    }
  }, [dispatch]);

  return (
    <TabWithFilter link={routes.nftMarket.galleryProfile.root} items={gallery} />
  );
};

export { GalleryTab };
