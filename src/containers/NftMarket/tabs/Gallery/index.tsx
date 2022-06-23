import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useShallowSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { nftMarketSelector } from 'store/selectors';
import { nftMarketGetGalleryAction } from 'store/nftMarket/actions';
import { marketURL, PAGE_ITEM_LIMIT, routes } from 'appConstants';
import { CardDataForList, NftReqDto } from 'types';
import { TabWithFilter } from '../TabWithFilter';
import { getTrxFromSun } from '../../../../utils';
import { marketClient } from '../../../../store/api';

const GalleryTab: FC = () => {
  const dispatch = useDispatch();
  const { gallery } = useShallowSelector(nftMarketSelector.getState);
  const [pageCount, setPageCount] = useState(0);

  const onUpdate = useCallback((data: NftReqDto) => {
    dispatch(nftMarketGetGalleryAction(data));
  }, [dispatch]);

  const getPrice = useCallback((item: CardDataForList) => {
    if (item.state_sale && item.state_sale.price) {
      return `${getTrxFromSun(item.state_sale.price)}`;
    }
    return '0';
  }, []);

  useEffect(() => {
    marketClient.get<number>(marketURL.MARKETPLACE.GALLERY_LIST, {
      params: {
        count: true,
      },
    }).then((res) => setPageCount(Math.ceil(res.data / PAGE_ITEM_LIMIT)));
  }, []);

  return (
    <TabWithFilter
      onUpdate={onUpdate}
      link={routes.nftMarket.galleryProfile.root}
      items={gallery}
      getPrice={getPrice}
      pageCount={pageCount}
    />
  );
};

export { GalleryTab };
