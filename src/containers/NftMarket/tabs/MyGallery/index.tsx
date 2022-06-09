import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { MarketCard } from 'components/MarketCard';
import { Checkbox } from 'components';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import { nftMarketGetMyGalleryAction, nftMarketSelectProfileAction } from 'store/nftMarket/actions';
import { routes } from 'appConstants';
import { useHistory } from 'react-router-dom';
import styles from '../styles.module.scss';

const MyGalleryTab: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { myGallery } = useShallowSelector(nftMarketSelector.getState);

  useEffect(() => {
    dispatch(nftMarketGetMyGalleryAction({ limit: 10, skip: 0 }));
  }, [dispatch]);

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
            img={item.metadata.url}
            type={item.face}
            price="123"
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export { MyGalleryTab };
