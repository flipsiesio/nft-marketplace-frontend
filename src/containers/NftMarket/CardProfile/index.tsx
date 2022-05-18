import React, {
  FC, useCallback, useMemo,
} from 'react';
import {
  Button,
  Icon, NavTabs, Table, Text,
} from 'components';
import { useHistory } from 'react-router-dom';
import { NftDto, TabItem } from 'types';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { ProfileAttribute } from '../ProfileAttribute';

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
  svg?: string
};

const CardProfile: FC<Props> = ({
  onAcceptBidClick,
  isMyGallery,
  buttons,
  selectedNft,
  svg,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const img = useMemo(() => {
    if (!svg) return null;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    return <img alt="card" src={url} className={styles.img} />;
  }, [svg]);

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const myGalleryBidCol = [
    { Header: 'Number', accessor: 'number' },
    { Header: 'Bid', accessor: 'bid' },
    { Header: 'Address', accessor: 'address' },
    {
      Header: '',
      accessor: 'button',
      Cell: () => (
        <Button onClick={onAcceptBidClick}>
          {t('nftMarket.accept')}
        </Button>
      ),
    },
  ];

  const tabItems = useMemo<TabItem[]>(() => (
    [
      {
        title: t('nftMarket.tradingHistory'),
        content: <Table className={styles.table} columns={historyCol} data={historyData} />,
      },
      {
        title: t('nftMarket.bids'),
        content:
  <Table
    className={styles.table}
    columns={isMyGallery ? myGalleryBidCol : bidCol}
    data={bidData}
  />,
      },
    ]
  ), [t]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={goBack} type="button">
          <Icon className={styles.backButtonArrow} icon="chevron" />
        </button>
        <Text className={styles.title}>{`ID #${selectedNft.id}`}</Text>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyLabels}>
          <Text>ID <Text tag="span" className={styles.bold}>{`#${selectedNft.id}`}</Text></Text>
          <Text>{t('nftMarket.owner')} <Text tag="span" className={styles.primary}>{selectedNft.owner}</Text></Text>
          <Text>{`${t('nftMarket.attributes')}:`}</Text>
        </div>
        <div className={styles.info}>
          {img}

          <div className={styles.mobileBodyLabels}>
            <Text>ID <Text tag="span" className={styles.bold}>{`#${selectedNft.id}`}</Text></Text>
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

        <NavTabs className={styles.tables} tabItems={tabItems} />
      </div>
    </div>
  );
};

export { CardProfile };
