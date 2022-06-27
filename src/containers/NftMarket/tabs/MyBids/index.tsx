import React, { FC, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import { MarketCard, Pagination } from '../../../../components';
import { useShallowSelector, useTabHandlers } from '../../../../hooks';
import { nftMarketSelector } from '../../../../store/selectors';
import {
  nftMarketGetMyBidsAction,
  nftMarketSelectProfileAction,
} from '../../../../store/nftMarket/actions';
import { marketURL, PAGE_ITEM_LIMIT, routes } from '../../../../appConstants';

export const MyBidsTab: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { myBids } = useShallowSelector(nftMarketSelector.getState);
  const {
    page,
    setPage,
    getBidsPrice,
    pageCount,
  } = useTabHandlers(marketURL.MARKETPLACE.MY_BIDS_LIST);

  useEffect(() => {
    dispatch(nftMarketGetMyBidsAction({ limit: PAGE_ITEM_LIMIT, skip: page * PAGE_ITEM_LIMIT }));
  }, [dispatch, page]);

  const onCardClick = useCallback((id: number) => {
    dispatch(nftMarketSelectProfileAction(undefined));
    history.push({
      pathname: routes.nftMarket.myGalleryProfile.root,
      search: `?id=${id}`,
    });
  }, [dispatch]);

  return (
    <div className={styles.wrap}>
      <div className={styles.cardContainer}>
        {myBids.map((item) => (
          <MarketCard
            className={styles.card}
            key={item.cardId}
            id={item.cardId}
            img={item.url}
            type={item.face}
            price={getBidsPrice(item)}
            onCardClick={onCardClick}
          />
        ))}
      </div>
      <Pagination page={page} onChange={setPage} pageCount={pageCount} />
    </div>
  );
};
