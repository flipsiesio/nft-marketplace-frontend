import React, { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Button, SetPriceModal, Text,
} from 'components';
import { useShallowSelector, useToggle } from 'hooks';
import { nftMarketBidAction, nftMarketGetProfileAction } from 'store/nftMarket/actions';
import { nftMarketSelector, uiSelector } from 'store/selectors';
import { useLocation } from 'react-router-dom';
import styles from '../styles.module.scss';
import { CardProfile } from '../../CardProfile';

const GalleryCardProfile: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));
  const getPutOnSaleStatus = useShallowSelector(uiSelector.getProp('NFT_MARKET.PUT_ON_SALE'));

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const id = search.get('id');
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, []);

  const {
    isActive: bidIsActive,
    onToggle: toggleBid,
  } = useToggle();

  const bidHandler = useCallback((amount: string) => {
    if (selectedNft) {
      dispatch(nftMarketBidAction({ price: amount, id: selectedNft.cardId }, toggleBid));
    }
  }, [dispatch, selectedNft]);

  return (
    <>
      {selectedNft && (
        <CardProfile
          selectedNft={selectedNft}
          buttons={(
            <div className={styles.buttonContainer}>
              <div className={styles.buttonWrap}>
                <div>
                  <Text className={styles.buttonLabel}>{t('nftMarket.salePrice')}</Text>
                  <Text className={styles.buttonValue}>20,000 <Text className={styles.primary} tag="span">TRX</Text></Text>
                </div>
                <Button onClick={toggleBid} className={styles.button}>{t('nftMarket.bid')}</Button>
              </div>
            </div>
          )}
        />
      )}
      <SetPriceModal
        isLoading={getPutOnSaleStatus === 'REQUEST'}
        onToggle={toggleBid}
        onSubmit={bidHandler}
        isOpen={bidIsActive}
      />
    </>
  );
};
export { GalleryCardProfile };
