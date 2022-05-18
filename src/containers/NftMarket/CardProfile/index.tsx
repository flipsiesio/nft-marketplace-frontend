import React, {
  FC, useCallback, useEffect, useMemo, useRef,
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
  const svgRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    if (svgRef.current && svg) {
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const image = document.createElement('img');
      image.style.minWidth = '241px';
      image.src = url;
      svgRef.current.appendChild(image);
    }
  });

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
        <Text className={styles.title}>{`ID ${selectedNft.id}`}</Text>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyLabels}>
          <Text>ID <Text tag="span" className={styles.bold}>{`#${selectedNft.id}`}</Text></Text>
          <Text>{t('nftMarket.owner')} <Text tag="span" className={styles.primary}>{selectedNft.owner}</Text></Text>
          <Text>{`${t('nftMarket.attributes')}:`}</Text>
        </div>
        <div className={styles.info}>
          <div ref={svgRef} />

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
              <ProfileAttribute
                className={styles.profileAttribute}
                head="Teardrop"
                value={selectedNft.teardrop}
                percent={selectedNft.teardropRarity}
              />
              <ProfileAttribute
                className={styles.profileAttribute}
                head="Egg"
                value={selectedNft.egg}
                percent={selectedNft.eggRarity}
              />
              <ProfileAttribute
                className={styles.profileAttribute}
                head="Hair"
                value={selectedNft.hair}
                percent={selectedNft.hairRarity}
              />
              <ProfileAttribute
                className={styles.profileAttribute}
                head="Clothes"
                value={selectedNft.clothes}
                percent={selectedNft.clothesRarity}
              />
              <ProfileAttribute
                className={styles.profileAttribute}
                head="Border line"
                value={String(selectedNft.borderline)}
                percent={selectedNft.borderlineRarity}
              />
              <ProfileAttribute
                className={styles.profileAttribute}
                head="Background"
                value={selectedNft.background}
                percent={selectedNft.backgroundRarity}
              />
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
