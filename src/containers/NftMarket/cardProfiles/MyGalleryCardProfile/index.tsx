import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, DelistModal, Text, WantToSellNftModal,
} from 'components';
import { useShallowSelector, useToggle } from 'hooks';
import { nftMarketSelector, uiSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { getBackFromSaleAction, nftMarketGetProfileAction, nftMarketAcceptBidAction } from 'store/nftMarket/actions';
import { MarketType } from 'types';
import { NftMarketActionTypes } from 'store/nftMarket/actionTypes';
import cx from 'classnames';
import { CardProfile } from '../../CardProfile';
import styles from '../styles.module.scss';
import { useMyProfileHandlers } from '../../../../hooks/useMyProfileHandlers';
import { RequestStatus } from '../../../../appConstants';
import { PutOnSaleModal } from '../../../PutOnSaleModal';
import { AcceptBidData } from '../../../CardHistory';
import { history, fromWeiToNumber } from '../../../../utils';

const MyGalleryCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [acceptBidData, setAcceptBidData] = useState<AcceptBidData>();
  const [actionType, setActionType] = useState<MarketType>(MarketType.Auction);
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));

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
  } = useMyProfileHandlers();

  const isWait = useMemo(() => {
    return getAcceptBidState === RequestStatus.REQUEST ||
      getBackFromSaleStatus === RequestStatus.REQUEST;
  }, [
    getBackFromSaleStatus,
    getAcceptBidState]);

  useEffect(() => {
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, [id]);

  const {
    isActive: putOnActive,
    onToggle: togglePutOn,
  } = useToggle();

  const {
    isActive: bidDelistActive,
    onToggle: bidToggleDelist,
  } = useToggle();

  const {
    isActive: saleDelistActive,
    onToggle: saleToggleDelist,
  } = useToggle();

  const {
    isActive: acceptBidActive,
    onToggle: acceptBidToggle,
  } = useToggle();

  const successHandler = useCallback(() => {
    if (id) dispatch(nftMarketGetProfileAction(id));
    if (saleDelistActive) saleToggleDelist();
    if (bidDelistActive) bidToggleDelist();
  }, [id, saleDelistActive, bidDelistActive]);

  const onAcceptBidClick = useCallback((data: AcceptBidData) => {
    setAcceptBidData(data);
    acceptBidToggle();
  }, [dispatch, acceptBidToggle]);

  const acceptBidHandler = useCallback(() => {
    if (!acceptBidData) return;
    dispatch(nftMarketAcceptBidAction({
      payerAddress: acceptBidData.payerAddress,
      orderId: acceptBidData.orderId,
    }, () => history.goBack()));
  }, [acceptBidData, dispatch]);

  const onAuctionButtonClick = useCallback(() => {
    setActionType(MarketType.Auction);
    togglePutOn();
  }, [dispatch, togglePutOn]);

  const onSaleButtonClick = useCallback(() => {
    setActionType(MarketType.Sale);
    togglePutOn();
  }, [dispatch, togglePutOn]);

  const getBackClick = useCallback((marketType: MarketType) => {
    return () => {
      if (selectedNft?.orderId === undefined) return;
      dispatch(getBackFromSaleAction({
        marketType,
        orderId: selectedNft.orderId,
      }, successHandler));
    };
  }, [dispatch, selectedNft, successHandler]);

  return (
    <>
      {selectedNft && (
        <CardProfile
          owner={selectedNft.owner}
          showBid={isBid}
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
                      theme="playNow"
                    >{t('nftMarket.putOnSale')}
                    </Button>
                  </div>
                  <div className={styles.buttonWrapInfo}>
                    <Button
                      disabled={isWait}
                      onClick={onAuctionButtonClick}
                      className={styles.button}
                      theme="playNow"
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
                      <Text title={salePrice} className={styles.infoBlockValue}>{`${salePrice}`}</Text>
                      <Text className={cx(styles.primary, styles.trx)} tag="span">BTTC</Text>
                    </div>
                  </div>
                  <Button
                    disabled={isWait}
                    onClick={saleToggleDelist}
                    className={styles.button}
                    theme="playNow"
                  >{t('nftMarket.delist')}
                  </Button>
                </div>
              )}
              {isBid && (
                <div className={styles.buttonWrap}>
                  <div>
                    <Text className={styles.buttonLabel}>{t('nftMarket.bidPrice')}</Text>
                    <div className={styles.price}>
                      <Text title={bidPrice} className={styles.infoBlockValue}>{`${bidPrice}`}</Text>
                      <Text className={cx(styles.primary, styles.trx)} tag="span">BTTC</Text>
                    </div>
                  </div>
                  <Button
                    disabled={isWait}
                    onClick={bidToggleDelist}
                    className={styles.button}
                    theme="playNow"
                  >{t('nftMarket.delist')}
                  </Button>
                </div>
              )}
            </div>
          )}
        />
      )}
      {putOnActive && (
        <PutOnSaleModal
          marketType={actionType}
          isOpen={putOnActive}
          onToggle={togglePutOn}
          id={id}
        />
      )}
      <DelistModal
        title={t('nftMarket.cancelSale')}
        isLoading={getBackFromSaleStatus === 'REQUEST'}
        onToggle={saleToggleDelist}
        onSubmit={getBackClick(MarketType.Sale)}
        isOpen={saleDelistActive}
      />
      <DelistModal
        title={t('nftMarket.cancelSale')}
        isLoading={getBackFromSaleStatus === 'REQUEST'}
        onToggle={bidToggleDelist}
        onSubmit={getBackClick(MarketType.Auction)}
        isOpen={bidDelistActive}
      />
      <WantToSellNftModal
        isLoading={isWait}
        id={selectedNft?.cardId || 0}
        onToggle={acceptBidToggle}
        onSubmit={acceptBidHandler}
        isOpen={acceptBidActive}
        price={`${fromWeiToNumber(`${acceptBidData?.price || 0}`)}`}
      />
    </>
  );
};

export { MyGalleryCardProfile };
