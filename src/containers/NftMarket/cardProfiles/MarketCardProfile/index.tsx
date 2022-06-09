import React, {
  FC, useCallback, useEffect,
} from 'react';
import {
  Button, MarketNftInteractionModal, SetPriceModal, Text,
} from 'components';
import { useTranslation } from 'react-i18next';
import { useShallowSelector, useToggle } from 'hooks';
import { useDispatch } from 'react-redux';
import { nftMarketBidAction, nftMarketBuyNowAction, nftMarketGetProfileAction } from 'store/nftMarket/actions';
import { nftMarketSelector, uiSelector } from 'store/selectors';
import { useLocation } from 'react-router-dom';
import styles from '../styles.module.scss';
import { CardProfile } from '../../CardProfile';
import { NftMarketActionTypes } from '../../../../store/nftMarket/actionTypes';

const MarketCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));
  const getPutOnSaleStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.BID));
  const getBuyStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.BUY_NOW));

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const id = search.get('id');
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, []);

  const {
    isActive: bidIsActive,
    onToggle: toggleBid,
  } = useToggle();

  const {
    isActive: buyIsActive,
    onToggle: toggleBuy,
  } = useToggle();

  const buyNowHandler = useCallback(() => {
    if (!selectedNft) return;
    dispatch(nftMarketBuyNowAction(
      { id: selectedNft.cardId, price: '0' },
      () => toggleBuy(),
    ));
  }, [dispatch, selectedNft]);

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
                  <Text className={styles.buttonLabel}>{t('nftMarket.highestBid')}</Text>
                  <Text className={styles.buttonValue}>20,000 <Text className={styles.primary} tag="span">TRX</Text></Text>
                </div>
                <Button onClick={toggleBid} className={styles.button}>{t('nftMarket.bid')}</Button>
              </div>
              <div className={styles.buttonWrap}>
                <div>
                  <Text className={styles.buttonLabel}>{t('nftMarket.listingPrice')}</Text>
                  <Text className={styles.buttonValue}>20,000 <Text className={styles.primary} tag="span">TRX</Text></Text>
                </div>
                <Button onClick={toggleBuy} theme="success" className={styles.button}>{t('nftMarket.buyNow')}</Button>
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
      <MarketNftInteractionModal
        isLoading={getBuyStatus === 'REQUEST'}
        onToggle={toggleBuy}
        onSubmit={buyNowHandler}
        isOpen={buyIsActive}
        id={selectedNft?.cardId || 0}
        price={selectedNft ? `${selectedNft.highestPrice}` : ''}
        title={t('nftMarket.purchaseConfirmation')}
      />
    </>
  );
};

export { MarketCardProfile };
