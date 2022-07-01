import React, {
  FC, useCallback, useEffect, useMemo,
} from 'react';
import { Button, SetPriceModal, Text } from 'components';
import { useTranslation } from 'react-i18next';
import { useShallowSelector, useToggle } from 'hooks';
import { useDispatch } from 'react-redux';
import { nftMarketBidAction, nftMarketGetProfileAction } from 'store/nftMarket/actions';
import { nftMarketSelector, tronSelector, uiSelector } from 'store/selectors';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import styles from '../styles.module.scss';
import { CardProfile } from '../../CardProfile';
import { NftMarketActionTypes } from '../../../../store/nftMarket/actionTypes';
import { MarketType } from '../../../../types';

const MarketCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const address = useShallowSelector(tronSelector.getProp('address'));
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));
  const getPutOnSaleStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.BID));
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

  const successCallback = useCallback(() => {
    toggleBid();
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, [toggleBid, id, dispatch]);

  const bidHandler = useCallback((amount: string) => {
    if (selectedNft && selectedNft.orderId) {
      dispatch(nftMarketBidAction({ price: amount, id: selectedNft.orderId }, successCallback));
    }
  }, [dispatch, selectedNft, successCallback]);

  const isOwner = useMemo(() => {
    return selectedNft?.owner === address;
  }, [selectedNft, address]);

  return (
    <>
      {selectedNft && (
        <CardProfile
          showExpirationTime
          active={selectedNft.active}
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
                    <Text className={styles.primary} tag="span">TRX</Text>
                  </div>
                </div>
                {!isOwner && (
                  <Button onClick={toggleBid} className={styles.button}>{t('nftMarket.bid')}</Button>
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
    </>
  );
};

export { MarketCardProfile };
