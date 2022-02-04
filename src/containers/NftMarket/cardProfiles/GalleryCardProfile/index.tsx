import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, SetPriceModal, Text,
} from 'components';
import { useShallowSelector, useToggle } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import styles from '../styles.module.scss';
import { CardProfile } from '../../CardProfile';

const GalleryCardProfile: FC = () => {
  const { t } = useTranslation();
  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));

  const {
    isActive: bidIsActive,
    onToggle: toggleBid,
  } = useToggle();
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
                <Button onClick={toggleBid} className={styles.button}>{t('nftMarket.bid')}</Button>
              </div>
            </div>
          )}
        />
      )}
      <SetPriceModal onToggle={toggleBid} onSubmit={() => {}} isOpen={bidIsActive} />
    </>
  );
};

export { GalleryCardProfile };
