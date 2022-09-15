import React, { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'components';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector, uiSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { nftMarketCancelBidAction, nftMarketGetProfileAction } from 'store/nftMarket/actions';
import { NftMarketActionTypes } from 'store/nftMarket/actionTypes';
import cx from 'classnames';
import { CardProfile } from '../../CardProfile';
import styles from '../styles.module.scss';
import { useMyProfileHandlers } from '../../../../hooks/useMyProfileHandlers';
import { RequestStatus } from '../../../../appConstants';

export const MyBidsCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));

  const getCancelBidStatus =
    useShallowSelector(uiSelector.getProp(NftMarketActionTypes.Cancel_BID));
  const {
    myBidPrice,
    id,
    isActive,
    actualBidOrderId,
  } = useMyProfileHandlers();

  useEffect(() => {
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, [id]);

  const successHandler = useCallback(() => {
    if (id) dispatch(nftMarketGetProfileAction(id));
  }, [id]);

  const cancelBidClick = useCallback(() => {
    if (selectedNft?.orderId) {
      dispatch(nftMarketCancelBidAction({
        orderId: selectedNft.orderId,
      }, successHandler));
    }
  }, [dispatch, selectedNft, successHandler]);

  return (
    <>
      {selectedNft && (
        <CardProfile
          actualOrderId={actualBidOrderId}
          active={isActive}
          selectedNft={selectedNft}
          buttons={(
            <div className={styles.buttonContainer}>
              <div className={styles.buttonWrap}>
                <div>
                  <Text className={styles.buttonLabel}>{t('nftMarket.myBid')}</Text>
                  <div className={styles.price}>
                    <Text title={myBidPrice} className={styles.infoBlockValue}>{`${myBidPrice}`}</Text>
                    <Text className={cx(styles.primary, styles.trx)} tag="span">BTTC</Text>
                  </div>
                </div>
                {!isActive && (
                  <Button
                    disabled={getCancelBidStatus === RequestStatus.REQUEST}
                    onClick={cancelBidClick}
                    className={styles.button}
                  >{t('nftMarket.cancelBid')}
                  </Button>
                )}
              </div>
            </div>
          )}
        />
      )}
    </>
  );
};
