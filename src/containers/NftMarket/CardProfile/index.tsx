import React, {
  FC, useCallback,
} from 'react';
import {
  Icon, Text,
} from 'components';
import { useHistory } from 'react-router-dom';
import { NftDto } from 'types';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { ProfileAttribute } from '../ProfileAttribute';
import { CardHistory } from '../../CardHistory';

export const historyData = [
  {
    events: 'listed',
    address: 'cn1847cn...c8n2',
    price: '10 TRX',
    date: '3.12.20',
  },
  {
    events: 'disabled',
    address: 'cn1847cn...c8n2',
    price: '10 TRX',
    date: '3.12.20',
  },
];

export const historyCol = [
  { Header: 'Event', accessor: 'events' },
  { Header: 'Address', accessor: 'address' },
  { Header: 'Price', accessor: 'price' },
  { Header: 'Date', accessor: 'date' },
];

export const bidData = [
  {
    number: '1',
    bid: '10 TRX',
    address: 'cn1847cn...c8n2',
  },
  {
    number: '2',
    address: 'cn1847cn...c8n2',
    bid: '10 TRX',
  },
];

export const bidCol = [
  { Header: 'Number', accessor: 'number' },
  { Header: 'Bid', accessor: 'bid' },
  { Header: 'Address', accessor: 'address' },
];

type Props = {
  onAcceptBidClick?: () => void,
  isMyGallery?: boolean,
  buttons: JSX.Element,
  selectedNft: NftDto,
};

const CardProfile: FC<Props> = ({
  onAcceptBidClick,
  isMyGallery,
  buttons,
  selectedNft,
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
          <img alt="card" src={selectedNft.url} className={styles.img} />

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
          onAcceptBidClick={onAcceptBidClick}
          cardId={selectedNft.cardId}
          isMyGallery={isMyGallery}
        />
      </div>
    </div>
  );
};

export { CardProfile };
