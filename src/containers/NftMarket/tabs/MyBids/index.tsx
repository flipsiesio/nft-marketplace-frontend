import React, { FC, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from '../styles.module.scss';
import { MarketCard, Pagination, Text } from '../../../../components';
import { useShallowSelector, useTabHandlers } from '../../../../hooks';
import { nftMarketSelector } from '../../../../store/selectors';
import {
  nftMarketGetMyBidsAction,
  nftMarketSelectProfileAction,
} from '../../../../store/nftMarket/actions';
import { marketURL, PAGE_ITEM_LIMIT, routes } from '../../../../appConstants';

export const MyBidsTab: FC = () => {
  const { t } = useTranslation();
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
      pathname: routes.nftMarket.myBidsProfile.root,
      search: `?id=${id}`,
    });
  }, [dispatch]);

  return (
    <div className={styles.wrap}>
      <div className={styles.cardContainer}>
        {myBids.length === 0 && (
          <Text className={styles.emptyLabel}>{t('nftMarket.empty')}</Text>
        )}
        {myBids.map((item) => (
          <MarketCard
            priceLabel={t('nftMarket.myBid')}
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
