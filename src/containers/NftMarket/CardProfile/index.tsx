import React, {
  FC, useCallback,
} from 'react';
import {
  Icon, NotActiveCardIcon, Text,
} from 'components';
import { useHistory } from 'react-router-dom';
import { NftDto } from 'types';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { ProfileAttribute } from '../ProfileAttribute';
import { CardHistory } from '../../CardHistory';

type Props = {
  onAcceptBidClick?: (payerAddress: string, nftId: string) => void
  isMyGallery?: boolean,
  buttons: JSX.Element,
  selectedNft: NftDto,
  active?: boolean
  actualOrderId?: number
  disabled?: boolean
};

const CardProfile: FC<Props> = ({
  onAcceptBidClick,
  isMyGallery,
  buttons,
  selectedNft,
  active,
  actualOrderId,
  disabled,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={goBack} type="button">
          <Icon className={styles.backButtonArrow} icon="chevron" />
        </button>
        <Text className={styles.title}>{`ID #${selectedNft.cardId}`}</Text>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyLabels}>
          <Text>ID <Text tag="span" className={styles.bold}>{`#${selectedNft.cardId}`}</Text></Text>
          <Text>{t('nftMarket.owner')} <Text tag="span" className={styles.primary}>{selectedNft.owner}</Text></Text>
          <Text>{`${t('nftMarket.attributes')}:`}</Text>
        </div>
        <div className={styles.info}>
          <NotActiveCardIcon url={selectedNft.url} active={active} className={styles.img} />

          <div className={styles.mobileBodyLabels}>
            <Text>ID <Text tag="span" className={styles.bold}>{`#${selectedNft.cardId}`}</Text></Text>
            <Text>{t('nftMarket.owner')} <Text tag="span" className={styles.primary}>{selectedNft.owner}</Text></Text>
          </div>

          <div className={styles.content}>
            <div className={styles.rowWrap}>
              <ProfileAttribute
                className={styles.profileAttribute}
                head="Suit"
                value={String(selectedNft.suit)}
                percent={selectedNft.suitRarity}
              />
              <ProfileAttribute
                className={styles.profileAttribute}
                head="Face"
                value={String(selectedNft.face)}
                percent={selectedNft.faceRarity}
              />
              {selectedNft.properties.map(({ label, rarity, name }) => (
                <ProfileAttribute
                  key={name}
                  className={styles.profileAttribute}
                  head={name}
                  value={label}
                  percent={rarity}
                />
              ))}
            </div>
            {buttons}
          </div>
        </div>

        <CardHistory
          disabled={disabled}
          onAcceptBidClick={onAcceptBidClick}
          cardId={selectedNft.cardId}
          isMyGallery={isMyGallery}
          actualOrderId={actualOrderId}
        />
      </div>
    </div>
  );
};

export { CardProfile };
