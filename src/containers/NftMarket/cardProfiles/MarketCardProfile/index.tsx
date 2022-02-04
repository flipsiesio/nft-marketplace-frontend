import React, { FC, useCallback } from 'react';
import {
  Button, MarketNftInteractionModal, SetPriceModal, Text,
} from 'components';
import { useTranslation } from 'react-i18next';
import { useShallowSelector, useToggle } from 'hooks';
import { useDispatch } from 'react-redux';
import { nftMarketBidAction, nftMarketBuyNowAction } from 'store/nftMarket/actions';
import { nftMarketSelector } from 'store/selectors';
import styles from '../styles.module.scss';
import { CardProfile } from '../../CardProfile';

export const historyData = [
  {
    events: 'listed',
    address: 'cn1847cn...c8n2',
    price: '10 TRX',
    date: '3.12.20',
  },
  {
    events: 'disabled',
    address: 'cn1847cn...c8n2',
    price: '10 TRX',
    date: '3.12.20',
  },
];

export const historyCol = [
  { Header: 'Event', accessor: 'events' },
  { Header: 'Address', accessor: 'address' },
  { Header: 'Price', accessor: 'price' },
  { Header: 'Date', accessor: 'date' },
];

export const bidData = [
  {
    number: '1',
    price: '10 TRX',
    address: 'cn1847cn...c8n2',
  },
  {
    number: '2',
    address: 'cn1847cn...c8n2',
    price: '10 TRX',
  },
];

export const bidCol = [
  { Header: 'Number', accessor: 'number' },
  { Header: 'Price', accessor: 'price' },
  { Header: 'Address', accessor: 'address' },
];

const MarketCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));

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
    dispatch(nftMarketBuyNowAction(selectedNft.attribute));
  }, [dispatch, selectedNft]);

  const bidHandler = useCallback((amount: string) => {
    dispatch(nftMarketBidAction(amount));
  }, [dispatch]);

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
      <SetPriceModal onToggle={toggleBid} onSubmit={bidHandler} isOpen={bidIsActive} />
      <MarketNftInteractionModal
        onToggle={toggleBuy}
        onSubmit={buyNowHandler}
        isOpen={buyIsActive}
        id={selectedNft?.id}
        price={selectedNft ? `${selectedNft.highestPrice}` : ''}
        title={t('nftMarket.purchaseConfirmation')}
      />
    </>
  );
};

export { MarketCardProfile };
