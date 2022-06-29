import React, { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, MarketNftInteractionModal, Text } from 'components';
import { useShallowSelector, useToggle } from 'hooks';
import { nftMarketBuyNowAction, nftMarketGetProfileAction } from 'store/nftMarket/actions';
import { nftMarketSelector, uiSelector } from 'store/selectors';
import { useLocation } from 'react-router-dom';
import styles from '../styles.module.scss';
import { CardProfile } from '../../CardProfile';
import { RequestStatus } from '../../../../appConstants';
import { history } from '../../../../utils';
import { NftMarketActionTypes } from '../../../../store/nftMarket/actionTypes';

const GalleryCardProfile: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));
  const buyNowStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.BUY_NOW));

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const id = search.get('id');
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, []);

  const {
    isActive: buyIsActive,
    onToggle: toggleBuy,
  } = useToggle();

  const successHandler = useCallback(() => {
    toggleBuy();
    history.goBack();
  }, [toggleBuy]);

  const buyHandler = useCallback(() => {
    if (selectedNft) {
      dispatch(nftMarketBuyNowAction(successHandler));
    }
  }, [dispatch, selectedNft, successHandler]);

  return (
    <>
      {selectedNft && (
        <CardProfile
          selectedNft={selectedNft}
          buttons={(
            <div className={styles.buttonContainer}>
              <div className={styles.buttonWrap}>
                <div>
                  <Text className={styles.buttonLabel}>{t('nftMarket.salePrice')}</Text>
                  <div className={styles.price}>
                    <Text
                      title={selectedNft.salePrice}
                      className={styles.buttonValue}
                    >
                      {selectedNft.salePrice}
                    </Text>
                    <Text className={styles.primary} tag="span">TRX</Text>
                  </div>
                </div>
                <Button onClick={toggleBuy} className={styles.button}>{t('nftMarket.buyNow')}</Button>
              </div>
            </div>
          )}
        />
      )}
      <MarketNftInteractionModal
        id={selectedNft?.cardId || 0}
        price={selectedNft?.salePrice}
        isOpen={buyIsActive}
        isLoading={buyNowStatus === RequestStatus.REQUEST}
        onToggle={toggleBuy}
        onSubmit={buyHandler}
        title={t('nftMarket.purchaseConfirmation')}
      />
    </>
  );
};
export { GalleryCardProfile };
