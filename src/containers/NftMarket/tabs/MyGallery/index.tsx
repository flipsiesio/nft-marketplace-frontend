import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { MarketCard } from 'components/MarketCard';
import { Checkbox, Pagination } from 'components';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import { nftMarketGetMyGalleryAction, nftMarketSelectProfileAction } from 'store/nftMarket/actions';
import { marketURL, PAGE_ITEM_LIMIT, routes } from 'appConstants';
import { useHistory } from 'react-router-dom';
import styles from '../styles.module.scss';
import { marketClient } from '../../../../store/api';
import { CardDataForList } from '../../../../types';
import { fromSunToNumber, getBidPrice } from '../../../../utils';

const MyGalleryTab: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { myGallery } = useShallowSelector(nftMarketSelector.getState);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(nftMarketGetMyGalleryAction({ limit: PAGE_ITEM_LIMIT, skip: page * PAGE_ITEM_LIMIT }));
  }, [dispatch, page]);

  useEffect(() => {
    marketClient.get<number>(marketURL.MARKETPLACE.PERSONAL_LIST, {
      params: {
        count: true,
      },
    })
      .then((res) => setPageCount(Math.ceil(res.data / PAGE_ITEM_LIMIT)));
  }, []);

  const [listed, setListed] = useState(false);
  const [inWallet, setInWallet] = useState(false);

  const listedHandler = useCallback((e, value: boolean) => {
    setListed(value);
  }, []);

  const walletHandler = useCallback((e, value: boolean) => {
    setInWallet(value);
  }, []);

  const onCardClick = useCallback((id: number) => {
    dispatch(nftMarketSelectProfileAction(undefined));
    history.push({
      pathname: routes.nftMarket.myGalleryProfile.root,
      search: `?id=${id}`,
    });
  }, [dispatch]);

  const getPrice = useCallback((item: CardDataForList) => {
    if (item.state_sale) {
      return `${fromSunToNumber(item.state_sale.price)}`;
    }

    if (item.state_bids) {
      return getBidPrice(item.state_bids);
    }

    return '0';
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.checkboxWrap}>
        <Checkbox
          checked={listed}
          className={styles.checkbox}
          name="listed"
          label="Listed"
          onChange={listedHandler}
        />
        <Checkbox
          checked={inWallet}
          className={styles.checkbox}
          name="inWallet"
          label="In wallet"
          onChange={walletHandler}
        />
      </div>
      <div className={styles.cardContainer}>
        {myGallery.map((item) => (
          <MarketCard
            className={styles.card}
            key={item.cardId}
            id={item.cardId}
            img={item.url}
            type={item.face}
            price={getPrice(item)}
            onCardClick={onCardClick}
          />
        ))}
      </div>
      <Pagination page={page} onChange={setPage} pageCount={pageCount} />
    </div>
  );
};

export { MyGalleryTab };
