import React, {
  FC, useCallback,
} from 'react';
import { useShallowSelector, useTabHandlers } from 'hooks';
import { useDispatch } from 'react-redux';
import { marketURL, routes } from 'appConstants';
import { nftMarketSelector } from 'store/selectors';
import { nftMarketGetGalleryAction } from 'store/nftMarket/actions';
import { NftReqDto } from 'types';
import { TabWithFilter } from '../TabWithFilter';

const GalleryTab: FC = () => {
  const dispatch = useDispatch();
  const { gallery } = useShallowSelector(nftMarketSelector.getState);

  const {
    pageCount,
    getSalePrice,
  } = useTabHandlers(marketURL.MARKETPLACE.GALLERY_LIST);

  const onUpdate = useCallback((data: NftReqDto) => {
    dispatch(nftMarketGetGalleryAction(data));
  }, [dispatch]);

  return (
    <TabWithFilter
      onUpdate={onUpdate}
      link={routes.nftMarket.galleryProfile.root}
      items={gallery}
      getPrice={getSalePrice}
      pageCount={pageCount}
    />
  );
};

export { GalleryTab };
