import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Button, SetPriceModal, Text, WantToSellNftModal,
} from 'components';
import { useTranslation } from 'react-i18next';
import { useShallowSelector, useToggle } from 'hooks';
import { useDispatch } from 'react-redux';
import { nftMarketBidAction, nftMarketGetProfileAction, nftMarketAcceptBidAction } from 'store/nftMarket/actions';
import { nftMarketSelector, walletSelectors, uiSelector } from 'store/selectors';
import { useLocation, useHistory } from 'react-router-dom';
import cx from 'classnames';
import { NftMarketActionTypes } from 'store/nftMarket/actionTypes';
import { MarketType } from 'types';
import { fromWeiToNumber } from 'utils';
import { RequestStatus } from 'appConstants';
import styles from '../styles.module.scss';
import { CardProfile } from '../../CardProfile';
import { AcceptBidData } from '../../../CardHistory';

const MarketCardProfile: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation();
  const address = useShallowSelector(walletSelectors.getProp('address'));
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));
  const getPutOnSaleStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.BID));

  const [acceptBidData, setAcceptBidData] = useState<AcceptBidData>();
  const getAcceptBidState = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.ACCEPT_BID));
  const getBackFromSaleStatus =
    useShallowSelector(uiSelector.getProp(NftMarketActionTypes.GET_BACK_FROM_SALE));

  const id = useMemo(() => {
    const search = new URLSearchParams(location.search);
    return search.get('id');
  }, [location]);

  useEffect(() => {
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, [id]);

  const {
    isActive: bidIsActive,
    onToggle: toggleBid,
  } = useToggle();

  const {
    isActive: acceptBidActive,
    onToggle: acceptBidToggle,
  } = useToggle();

  const onAcceptBidClick = useCallback((data: AcceptBidData) => {
    setAcceptBidData(data);
    acceptBidToggle();
  }, [dispatch, acceptBidToggle]);

  const successCallback = useCallback(() => {
    toggleBid();
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, [toggleBid, id, dispatch]);

  const bidHandler = useCallback((amount: string) => {
    if (selectedNft && selectedNft.orderId !== undefined) {
      dispatch(nftMarketBidAction({ price: amount, id: selectedNft.orderId }, successCallback));
    }
  }, [dispatch, selectedNft, successCallback]);

  const isWait = useMemo(() => {
    return getAcceptBidState === RequestStatus.REQUEST ||
      getBackFromSaleStatus === RequestStatus.REQUEST;
  }, [
    getBackFromSaleStatus,
    getAcceptBidState]);

  const isOwner = useMemo(() => {
    return selectedNft?.owner?.toLowerCase() === address.toLowerCase();
  }, [selectedNft, address]);

  const isRaiseBid = useMemo(() => {
    if (selectedNft?.bids) {
      return Object.keys(selectedNft.bids).some((key) => key === address);
    }
    return false;
  }, [selectedNft, address]);

  const acceptBidHandler = useCallback(() => {
    if (!acceptBidData) return;
    dispatch(nftMarketAcceptBidAction({
      payerAddress: acceptBidData.payerAddress,
      orderId: acceptBidData.orderId,
    }, () => {
      history.push('/nftMarket');
      acceptBidToggle();
    }));
  }, [acceptBidData, dispatch]);

  return (
    <>
      {selectedNft && (
        <CardProfile
          showExpirationTime
          active={selectedNft.active}
          onAcceptBidClick={onAcceptBidClick}
          selectedNft={selectedNft}
          buttons={(
            <div className={styles.buttonContainer}>
              <div className={cx(
                styles.buttonWrap,
                { [styles.singleButtonWrap]: isOwner },
              )}
              >
                <div>
                  <Text className={styles.buttonLabel}>{t('nftMarket.bidPrice')}</Text>
                  <div className={styles.price}>
                    <Text
                      title={selectedNft.bidPrice}
                      className={styles.buttonValue}
                    >
                      {selectedNft.bidPrice}
                    </Text>
                    <Text className={styles.primary} tag="span">BTTC</Text>
                  </div>
                </div>
                {!isOwner && (
                  <Button onClick={toggleBid} className={styles.button} theme="playNow">
                    {isRaiseBid ? t('nftMarket.raiseBid') : t('nftMarket.bid')}
                  </Button>
                )}
              </div>
            </div>
          )}
        />
      )}
      <SetPriceModal
        marketType={MarketType.Auction}
        isLoading={getPutOnSaleStatus === 'REQUEST'}
        onToggle={toggleBid}
        onSubmit={bidHandler}
        isOpen={bidIsActive}
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

export { MarketCardProfile };
