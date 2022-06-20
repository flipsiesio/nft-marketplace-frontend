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
  nftMarketAcceptBidAction,
  nftMarketApproveAction,
  nftMarketDelistAction,
  nftMarketGetProfileAction,
  nftMarketPutOnAction,
} from 'store/nftMarket/actions';
import { useLocation } from 'react-router-dom';
import { MarketType } from 'types';
import { NftMarketActionTypes } from 'store/nftMarket/actionTypes';
import { CardProfile } from '../../CardProfile';
import styles from '../styles.module.scss';
import { history } from '../../../../utils';

const MyGalleryCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [actionType, setActionType] = useState<MarketType>(MarketType.Auction);
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));
  const getDelistStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.DELIST));
  const getPutOnSaleStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.PUT_ON));
  const getApproveStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.APPROVE));

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const id = search.get('id');
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, []);

  const {
    isActive: putOnActive,
    onToggle: togglePutOn,
  } = useToggle();

  const {
    isActive: approveActive,
    onToggle: toggleApprove,
  } = useToggle();

  const {
    isActive: delistActive,
    onToggle: toggleDelist,
  } = useToggle();

  const putOnHandler = useCallback((amount: string) => {
    if (selectedNft) {
      dispatch(nftMarketPutOnAction({
        marketType: actionType,
        price: parseFloat(amount),
        nftAddress: selectedNft.cardId,
      }, () => togglePutOn()));
    }
  }, [dispatch, selectedNft, actionType, togglePutOn]);

  const onAcceptBidClick = useCallback((payerAddress: string, nftId: string) => {
    dispatch(nftMarketAcceptBidAction({
      payerAddress,
      nftId,
    }, () => history.goBack()));
  }, [dispatch]);

  const delistHandler = useCallback(() => {
    if (selectedNft) {
      dispatch(nftMarketDelistAction(
        { orderId: selectedNft.cardId, marketType: MarketType.Auction },
        () => toggleDelist(),
      ));
    }
  }, [selectedNft, toggleDelist, dispatch]);

  const approveHandler = useCallback(() => {
    dispatch(nftMarketApproveAction({
      actionType,
      tokenId: selectedNft!.cardId,
    }, () => {
      toggleApprove();
      togglePutOn();
    }));
  }, [actionType, selectedNft, toggleApprove, togglePutOn]);

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
        onToggle={togglePutOn}
        onSubmit={putOnHandler}
        isOpen={putOnActive}
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
