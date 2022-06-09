import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  ApproveModal, Button, DelistModal, SetPriceModal, Text,
} from 'components';
import { useShallowSelector, useToggle } from 'hooks';
import { nftMarketSelector, uiSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import {
  nftMarketApproveAction,
  nftMarketDelistAction,
  nftMarketGetProfileAction,
  nftMarketPutOnAuctionAction,
  nftMarketPutOnSaleAction,
} from 'store/nftMarket/actions';
import { useLocation } from 'react-router-dom';
import { MarketType } from 'types';
import { CardProfile } from '../../CardProfile';
import styles from '../styles.module.scss';

const MyGalleryCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [actionType, setActionType] = useState<MarketType>(MarketType.Auction);
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));
  const getDelistStatus = useShallowSelector(uiSelector.getProp('NFT_MARKET.DELIST'));
  const getPutOnSaleStatus = useShallowSelector(uiSelector.getProp('NFT_MARKET.PUT_ON_SALE'));
  const getPutOnAuctionStatus = useShallowSelector(uiSelector.getProp('NFT_MARKET.PUT_ON_AUCTION'));
  const getApproveStatus = useShallowSelector(uiSelector.getProp('NFT_MARKET.APPROVE'));

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const id = search.get('id');
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, []);

  const {
    isActive: putOnSaleActive,
    onToggle: togglePutOnSale,
  } = useToggle();

  const {
    isActive: putOnAuctionActive,
    onToggle: togglePutOnAuction,
  } = useToggle();

  const {
    isActive: approveActive,
    onToggle: toggleApprove,
  } = useToggle();

  const {
    isActive: delistActive,
    onToggle: toggleDelist,
  } = useToggle();

  const putOnSaleHandler = useCallback((amount: string) => {
    if (selectedNft) {
      dispatch(nftMarketPutOnSaleAction({
        price: parseFloat(amount),
        nftAddress: selectedNft.cardId,
      }, () => togglePutOnSale()));
    }
  }, [dispatch, selectedNft]);

  const putOnAuctionHandler = useCallback((amount: string) => {
    if (selectedNft) {
      dispatch(nftMarketPutOnAuctionAction({
        price: parseFloat(amount),
        nftAddress: selectedNft.cardId,
      }, () => togglePutOnAuction()));
    }
  }, [dispatch, selectedNft]);

  const onAcceptBidClick = useCallback(() => {
    // TODO when will ready backend
  }, [dispatch]);

  const delistHandler = useCallback(() => {
    if (selectedNft) {
      dispatch(nftMarketDelistAction(
        { orderId: selectedNft.cardId, marketType: MarketType.Auction },
        () => toggleDelist(),
      ));
    }
  }, []);

  const approveHandler = useCallback(() => {
    dispatch(nftMarketApproveAction({
      actionType,
      tokenId: selectedNft!.cardId,
    }, () => {
      toggleApprove();
      if (actionType === MarketType.Sale) togglePutOnSale();
      else togglePutOnAuction();
    }));
  }, [actionType]);

  const onAuctionButtonClick = () => {
    setActionType(MarketType.Auction);
    toggleApprove();
  };

  const onSaleButtonClick = () => {
    setActionType(MarketType.Sale);
    toggleApprove();
  };

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
                  <Text className={styles.buttonLabel}>{t('nftMarket.listingPrice')}</Text>
                  <Text className={styles.buttonValue}>20,000 <Text className={styles.primary} tag="span">TRX</Text></Text>
                </div>
                <Button onClick={onSaleButtonClick} className={styles.button}>{t('nftMarket.putOnSale')}</Button>
              </div>
              <div className={styles.buttonWrap}>
                <div>
                  <Text className={styles.buttonLabel}>{t('nftMarket.highestBid')}</Text>
                  <Text className={styles.buttonValue}>20,000 <Text className={styles.primary} tag="span">TRX</Text></Text>
                </div>
                <Button onClick={onAuctionButtonClick} className={styles.button}>{t('nftMarket.putOnAuction')}</Button>
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
      <SetPriceModal
        isLoading={getPutOnAuctionStatus === 'REQUEST'}
        onToggle={togglePutOnAuction}
        onSubmit={putOnAuctionHandler}
        isOpen={putOnAuctionActive}
      />
      <DelistModal
        isLoading={getDelistStatus === 'REQUEST'}
        onToggle={toggleDelist}
        onSubmit={delistHandler}
        isOpen={delistActive}
      />
      <ApproveModal
        isLoading={getApproveStatus === 'REQUEST'}
        onToggle={toggleApprove}
        onSubmit={approveHandler}
        isOpen={approveActive}
      />
    </>
  );
};

export { MyGalleryCardProfile };
