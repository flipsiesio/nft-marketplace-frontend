import React, {
  FC, useCallback, useMemo,
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
import { shortenPhrase } from '../../../utils';

type Props = {
  onAcceptBidClick?: (payerAddress: string, nftId: string) => void
  isMyGallery?: boolean,
  buttons: JSX.Element,
  selectedNft: NftDto,
  active?: boolean
  actualOrderId?: number
  disabled?: boolean
  owner?: string
};

const CardProfile: FC<Props> = ({
  onAcceptBidClick,
  isMyGallery,
  buttons,
  selectedNft,
  active,
  actualOrderId,
  disabled,
  owner,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const cardOwner = useMemo(() => {
    return shortenPhrase(owner || selectedNft.owner || '');
  }, [owner, selectedNft]);

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
          <Text>
            {t('nftMarket.owner')}
            &nbsp;
            <Text tag="span" className={styles.primary}>{cardOwner}</Text>
          </Text>
          <Text>{`${t('nftMarket.attributes')}:`}</Text>
        </div>
        <div className={styles.info}>
          <NotActiveCardIcon
            showShadows
            url={selectedNft.url}
            active={active}
            className={styles.img}
          />

          <div className={styles.mobileBodyLabels}>
            <Text>ID <Text tag="span" className={styles.bold}>{`#${selectedNft.cardId}`}</Text></Text>
            <Text>
              {t('nftMarket.owner')}
              &nbsp;
              <Text tag="span" className={styles.primary}>{cardOwner}</Text>
            </Text>
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
