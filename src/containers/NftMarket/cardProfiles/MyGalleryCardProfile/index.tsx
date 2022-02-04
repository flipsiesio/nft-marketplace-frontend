import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, MarketNftInteractionModal, SetPriceModal, Text,
} from 'components';
import { useShallowSelector, useToggle } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import { CardProfile } from '../../CardProfile';
import { nftMarketPutOnSaleAction } from '../../../../store/nftMarket/actions';

const MyGalleryCardProfile: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));

  const {
    isActive: putOnSaleActive,
    onToggle: togglePutOnSale,
  } = useToggle();

  const {
    isActive: sellActive,
    onToggle: toggleSell,
  } = useToggle();

  const putOnSaleHandler = useCallback((amount: string) => {
    dispatch(nftMarketPutOnSaleAction(amount));
  }, [dispatch]);

  return (
    <>
      {selectedNft && (
        <CardProfile
          selectedNft={selectedNft}
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
        onToggle={togglePutOnSale}
        onSubmit={putOnSaleHandler}
        isOpen={putOnSaleActive}
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
