import React, {
  FC, MouseEventHandler, useCallback, useMemo,
} from 'react';
import {
  Icon, Link, NotActiveCardIcon, Text,
} from 'components';
import { useHistory } from 'react-router-dom';
import { NftDto } from 'types';
import { useTranslation } from 'react-i18next';
import { scanAddressUrl } from 'appConstants';
import { differenceInDays } from 'date-fns';
import styles from './styles.module.scss';
import { ProfileAttribute } from '../ProfileAttribute';
import { AcceptBidData, CardHistory } from '../../CardHistory';
import { shortenPhrase } from '../../../utils';

type Props = {
  onAcceptBidClick?: (data: AcceptBidData) => void
  isMyGallery?: boolean,
  buttons: JSX.Element,
  selectedNft: NftDto,
  active?: boolean
  actualOrderId?: number
  disabled?: boolean
  owner?: string
  showBid?: boolean
  showExpirationTime?: boolean
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
  showBid,
  showExpirationTime,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const cardOwner = useMemo(() => {
    return shortenPhrase(owner || selectedNft.owner || '');
  }, [owner, selectedNft]);

  const ownerClick = useCallback<MouseEventHandler<HTMLAnchorElement>>((e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`${scanAddressUrl}${owner || selectedNft.owner}`);
  }, [owner, selectedNft]);

  const expirationDays = useMemo(() => {
    if (selectedNft.expirationTime) {
      const day = differenceInDays(new Date(selectedNft.expirationTime * 1000), new Date());

      return `${day}`;
    }

    return '0';
  }, [selectedNft]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={goBack} type="button">
          <Icon className={styles.backButtonArrow} icon="chevron" />
        </button>
        <div className={styles.titleWrap}>
          <Text className={styles.title}>{`ID #${selectedNft.cardId}`}</Text>
          {showExpirationTime && expirationDays > '0' && (
            <Text className={styles.subTitle}>{t('nftMarket.dayBeforeExpiration{{day}}', { day: expirationDays })}</Text>
          )}
          {showExpirationTime && expirationDays === '0' && (
            <Text className={styles.subTitle}>{t('nftMarket.todayEndExpiration')}</Text>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyLabels}>
          <Text className={styles.bodyLabel}>
            ID
            &nbsp;
            <Text tag="span" className={styles.bold}>{`#${selectedNft.cardId}`}</Text>
          </Text>
          <Text className={styles.bodyLabel}>
            {t('nftMarket.owner')}
            &nbsp;
            <Link
              onClick={ownerClick}
              to={`${scanAddressUrl}${owner || selectedNft.owner}`}
              className={styles.primary}
            >{cardOwner}
            </Link>
          </Text>
        </div>
        <div className={styles.info}>
          <NotActiveCardIcon
            showShadows
            url={selectedNft.url}
            active={active}
            className={styles.img}
          />

          <div className={styles.mobileBodyLabels}>
            <Text className={styles.bodyLabel}>
              ID
              &nbsp;
              <Text tag="span" className={styles.bold}>{`#${selectedNft.cardId}`}</Text>
            </Text>
            <Text className={styles.bodyLabel}>
              {t('nftMarket.owner')}
              &nbsp;
              <Link
                onClick={ownerClick}
                to={`${scanAddressUrl}${owner || selectedNft.owner}`}
                className={styles.primary}
              >{cardOwner}
              </Link>
            </Text>
          </div>

          <div className={styles.content}>
            <div className={styles.rowWrap}>
              <div className={styles.firstAttribute}>
                <Text className={styles.attributeLabel}>{`${t('nftMarket.attributes')}:`}</Text>
                <ProfileAttribute
                  className={styles.profileAttribute}
                  head="Suit"
                  value={String(selectedNft.suit)}
                  percent={selectedNft.suitRarity}
                />
              </div>
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
          showBid={showBid}
          disabled={disabled}
          onAcceptBidClick={onAcceptBidClick}
          selectedNft={selectedNft}
          isMyGallery={isMyGallery}
          actualOrderId={actualOrderId}
        />
      </div>
    </div>
  );
};

export { CardProfile };
