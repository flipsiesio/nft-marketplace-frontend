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
    updatePage,
  } = useTabHandlers(marketURL.MARKETPLACE.GALLERY_LIST);

  const onUpdate = useCallback((data: NftReqDto) => {
    dispatch(nftMarketGetGalleryAction(data));
    updatePage(data);
  }, [dispatch, updatePage]);

  return (
    <TabWithFilter
      onUpdate={onUpdate}
      linkSale={routes.nftMarket.galleryProfile.root}
      linkBid={routes.nftMarket.marketProfile.root}
      items={gallery}
      getPrice={getSalePrice}
      pageCount={pageCount}
      isSale
    />
  );
};

export { GalleryTab };
