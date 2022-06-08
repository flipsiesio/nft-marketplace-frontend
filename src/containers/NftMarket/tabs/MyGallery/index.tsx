import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { MarketCard } from 'components/MarketCard';
import img from 'assets/img/card.png';
import { Checkbox } from 'components';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import { nftMarketGetMyGalleryAction } from 'store/nftMarket/actions';
import styles from '../styles.module.scss';

const MyGalleryTab: FC = () => {
  const dispatch = useDispatch();
  const { myGallery } = useShallowSelector(nftMarketSelector.getState);

  useEffect(() => {
    if (!myGallery) dispatch(nftMarketGetMyGalleryAction());
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
    console.log(id);
    // dispatch(nftMarketSetStateAction({ selectedNft: selectedItem }));
    // history.push(routes.nftMarket.myGalleryProfile.root);
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
            img={img}
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
