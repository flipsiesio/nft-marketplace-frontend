import React, {
  FC, useCallback, useEffect, useMemo, useState,
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
import { RequestStatus } from '../../../../appConstants';

const MyGalleryCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [actionType, setActionType] = useState<MarketType>(MarketType.Auction);
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));

  const getPutOnSaleStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.PUT_ON));
  const getApproveStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.APPROVE));
  const getAcceptBidState = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.ACCEPT_BID));
  const getBackFromSaleStatus =
    useShallowSelector(uiSelector.getProp(NftMarketActionTypes.GET_BACK_FROM_SALE));
  const {
    id,
    isBid,
    isSale,
    salePrice,
    bidPrice,
    isActive,
    actualBidOrderId,
  } = useMyGalleryHandlers();

  const isWait = useMemo(() => {
    return getAcceptBidState === RequestStatus.REQUEST ||
      getBackFromSaleStatus === RequestStatus.REQUEST ||
      getApproveStatus === RequestStatus.REQUEST ||
      getPutOnSaleStatus === RequestStatus.REQUEST;
  }, [
    getApproveStatus,
    getBackFromSaleStatus,
    getPutOnSaleStatus,
    getAcceptBidState]);

  useEffect(() => {
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, [id]);

  const successHandler = useCallback(() => {
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
    isActive: bidDelistActive,
    onToggle: bidToggleDelist,
  } = useToggle();

  const {
    isActive: saleDelistActive,
    onToggle: saleToggleDelist,
  } = useToggle();

  const putOnHandler = useCallback((amount: string) => {
    if (selectedNft) {
      dispatch(nftMarketPutOnAction({
        marketType: actionType,
        price: parseFloat(amount),
        nftAddress: selectedNft.cardId,
      }, () => {
        togglePutOn();
        successHandler();
      }));
    }
  }, [dispatch, selectedNft, actionType, togglePutOn, successHandler]);

  const onAcceptBidClick = useCallback((payerAddress: string, nftId: string) => {
    dispatch(nftMarketAcceptBidAction({
      payerAddress,
      nftId,
    }, () => history.goBack()));
  }, [dispatch]);

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
      }, successHandler));
    };
  }, [dispatch, selectedNft]);

  return (
    <>
      {selectedNft && (
        <CardProfile
          disabled={isWait}
          actualOrderId={actualBidOrderId}
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
                      disabled={isWait}
                      onClick={onSaleButtonClick}
                      className={styles.button}
                    >{t('nftMarket.putOnSale')}
                    </Button>
                  </div>
                  <div className={styles.buttonWrapInfo}>
                    <Button
                      disabled={isWait}
                      onClick={onAuctionButtonClick}
                      className={styles.button}
                    >{t('nftMarket.putOnAuction')}
                    </Button>
                  </div>
                </>
              )}

              {isSale && (
                <div className={styles.buttonWrap}>
                  <div>
                    <Text className={styles.buttonLabel}>{t('nftMarket.salePrice')}</Text>
                    <div className={styles.price}>
                      <Text className={styles.infoBlockValue}>{`${salePrice}`}</Text>
                      <Text className={cx(styles.primary, styles.trx)} tag="span">TRX</Text>
                    </div>
                  </div>
                  <Button
                    disabled={isWait}
                    onClick={saleToggleDelist}
                    className={styles.button}
                  >{t('nftMarket.delist')}
                  </Button>
                </div>
              )}
              {isBid && (
                <div className={styles.buttonWrap}>
                  <div>
                    <Text className={styles.buttonLabel}>{t('nftMarket.bidPrice')}</Text>
                    <div className={styles.price}>
                      <Text className={styles.infoBlockValue}>{`${bidPrice}`}</Text>
                      <Text className={cx(styles.primary, styles.trx)} tag="span">TRX</Text>
                    </div>
                  </div>
                  <Button
                    disabled={isWait}
                    onClick={bidToggleDelist}
                    className={styles.button}
                  >{t('nftMarket.delist')}
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
        title={t('nftMarket.cancelSale')}
        isLoading={getBackFromSaleStatus === 'REQUEST'}
        onToggle={saleToggleDelist}
        onSubmit={getBackClick(MarketType.Sale)}
        isOpen={saleDelistActive}
      />
      <DelistModal
        title={t('nftMarket.cancelBids')}
        isLoading={getBackFromSaleStatus === 'REQUEST'}
        onToggle={bidToggleDelist}
        onSubmit={getBackClick(MarketType.Auction)}
        isOpen={bidDelistActive}
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
