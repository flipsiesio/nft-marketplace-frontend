import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, MarketNftInteractionModal, SetPriceModal, Text, DelistModal,
} from 'components';
import { useShallowSelector, useToggle } from 'hooks';
import { nftMarketSelector, uiSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { nftMarketDelistAction, nftMarketPutOnSaleAction } from 'store/nftMarket/actions';
import styles from '../styles.module.scss';
import { CardProfile } from '../../CardProfile';

const MyGalleryCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));
  const getDelistStatus = useShallowSelector(uiSelector.getProp('NFT_MARKET.DELIST'));
  const getPutOnSaleStatus = useShallowSelector(uiSelector.getProp('NFT_MARKET.PUT_ON_SALE'));

  const {
    isActive: putOnSaleActive,
    onToggle: togglePutOnSale,
  } = useToggle();

  const {
    isActive: sellActive,
    onToggle: toggleSell,
  } = useToggle();

  const {
    isActive: delistActive,
    onToggle: toggleDelist,
  } = useToggle();

  const putOnSaleHandler = useCallback((amount: string) => {
    dispatch(nftMarketPutOnSaleAction({
      price: Number(amount),
      nftAddress: selectedNft!.id,
    }, () => togglePutOnSale()));
  }, [dispatch]);

  const onAcceptBidClick = useCallback(() => {
    // TODO when will ready backend
  }, [dispatch]);

  const delistHandler = useCallback(() => {
    dispatch(nftMarketDelistAction(
      selectedNft!.id,
      () => toggleDelist(),
    ));
  }, []);

  return (
    <>
      {selectedNft && (
        <CardProfile
          onAcceptBidClick={onAcceptBidClick}
          selectedNft={selectedNft}
          isMyGallery
          buttons={(
            <div className={styles.buttonContainer}>
              <div className={styles.buttonWrap}>
                <div>
                  <Text className={styles.buttonLabel}>{t('nftMarket.highestBid')}</Text>
                  <Text className={styles.buttonValue}>20,000 <Text className={styles.primary} tag="span">TRX</Text></Text>
                </div>
                <Button onClick={togglePutOnSale} className={styles.button}>{t('nftMarket.putOnSale')}</Button>
              </div>
            </div>
          )}
        />
      )}
      <SetPriceModal
        isLoading={getPutOnSaleStatus === 'REQUEST'}
        onToggle={togglePutOnSale}
        onSubmit={putOnSaleHandler}
        isOpen={putOnSaleActive}
      />
      <DelistModal
        isLoading={getDelistStatus === 'REQUEST'}
        onToggle={toggleDelist}
        onSubmit={delistHandler}
        isOpen={delistActive}
      />
      <MarketNftInteractionModal
        onToggle={toggleSell}
        onSubmit={() => {}}
        title={t('nftMarket.sellTitle')}
        price={selectedNft ? `${selectedNft.highestPrice}` : ''}
        isOpen={sellActive}
        id={selectedNft?.id}
      />
    </>
  );
};

export { MyGalleryCardProfile };
