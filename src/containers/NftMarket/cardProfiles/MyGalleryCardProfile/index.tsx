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
  getBackFromSaleAction,
  nftMarketAcceptBidAction,
  nftMarketApproveAction,
  nftMarketDelistAction,
  nftMarketGetProfileAction,
  nftMarketPutOnAction,
} from 'store/nftMarket/actions';
import { MarketType } from 'types';
import { NftMarketActionTypes } from 'store/nftMarket/actionTypes';
import cx from 'classnames';
import { CardProfile } from '../../CardProfile';
import styles from '../styles.module.scss';
import { history } from '../../../../utils';
import { useMyGalleryHandlers } from '../../../../hooks/useMyGalleryHandlers';

const MyGalleryCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [actionType, setActionType] = useState<MarketType>(MarketType.Auction);
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));
  const getDelistStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.DELIST));
  const getPutOnSaleStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.PUT_ON));
  const getApproveStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.APPROVE));
  const getBackFromSaleStatus =
    useShallowSelector(uiSelector.getProp(NftMarketActionTypes.GET_BACK_FROM_SALE));
  const {
    id,
    isBid,
    isSale,
    salePrice,
    bidPrice,
    isActive,
    notActualBid,
    notActualSale,
  } = useMyGalleryHandlers();

  useEffect(() => {
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, [id]);

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

  const onAuctionButtonClick = useCallback(() => {
    setActionType(MarketType.Auction);
    toggleApprove();
  }, [dispatch, toggleApprove]);

  const onSaleButtonClick = useCallback(() => {
    setActionType(MarketType.Sale);
    toggleApprove();
  }, [dispatch, toggleApprove]);

  const getBackClick = useCallback((marketType: MarketType) => {
    return () => {
      if (selectedNft?.orderId === undefined) return;
      dispatch(getBackFromSaleAction({
        marketType,
        orderId: selectedNft.orderId,
      }));
    };
  }, [dispatch]);

  return (
    <>
      {selectedNft && (
        <CardProfile
          active={isActive}
          onAcceptBidClick={onAcceptBidClick}
          selectedNft={selectedNft}
          isMyGallery
          buttons={(
            <div className={styles.buttonContainer}>
              {!isSale && !isBid && (
                <>
                  <div className={styles.buttonWrapInfo}>
                    <Button
                      onClick={onSaleButtonClick}
                      className={styles.button}
                    >{t('nftMarket.putOnSale')}
                    </Button>
                  </div>
                  <div className={styles.buttonWrapInfo}>
                    <Button
                      onClick={onAuctionButtonClick}
                      className={styles.button}
                    >{t('nftMarket.putOnAuction')}
                    </Button>
                  </div>
                </>
              )}

              {isSale && !notActualSale && (
                <div className={styles.buttonWrapInfo}>
                  <Text className={styles.buttonLabel}>Sale Price</Text>
                  <div className={styles.price}>
                    <Text className={styles.infoBlockValue}>{`${salePrice}`}</Text>
                    <Text className={cx(styles.primary, styles.trx)} tag="span">TRX</Text>
                  </div>
                </div>
              )}
              {isBid && !notActualBid && (
                <div className={styles.buttonWrapInfo}>
                  <Text className={styles.buttonLabel}>Bid Price</Text>
                  <div className={styles.price}>
                    <Text className={styles.infoBlockValue}>{`${bidPrice}`}</Text>
                    <Text className={cx(styles.primary, styles.trx)} tag="span">TRX</Text>
                  </div>
                </div>
              )}
              {notActualBid && (
                <div className={styles.buttonWrapInfo}>
                  <Button
                    disabled={getBackFromSaleStatus === 'REQUEST'}
                    onClick={getBackClick(MarketType.Auction)}
                    className={styles.button}
                  >{t('nftMarket.getBackFromBid')}
                  </Button>
                </div>
              )}
              {notActualSale && (
                <div className={styles.buttonWrapInfo}>
                  <Button
                    disabled={getBackFromSaleStatus === 'REQUEST'}
                    onClick={getBackClick(MarketType.Sale)}
                    className={styles.button}
                  >{t('nftMarket.getBackFromSale')}
                  </Button>
                </div>
              )}
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
