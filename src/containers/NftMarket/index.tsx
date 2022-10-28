import React, { FC, useMemo } from 'react';
import { NavTabs, Text } from 'components';
import { useTranslation } from 'react-i18next';
import { TabItem } from 'types/components';
import styles from './styles.module.scss';
import { MarketTab } from './tabs/Market';
import { MyGalleryTab } from './tabs/MyGallery';
import { MyBidsTab } from './tabs/MyBids';

const NftMarket: FC = () => {
  const { t } = useTranslation();

  const tabItems = useMemo<TabItem[]>(() => (
    [
      {
        title: t('nftMarket.marketTab'),
        content: <MarketTab />,
        menu: [
          {
            title: t('nftMarket.viewAuctions'),
            search: 'bids',
          },
          {
            title: t('nftMarket.viewBuyNow'),
            search: 'sale',
          },
          {
            title: t('nftMarket.viewAll'),
            search: '',
          },
        ],
      },
      { title: t('nftMarket.myGalleryTab'), content: <MyGalleryTab /> },
      { title: t('nftMarket.myBidsTab'), content: <MyBidsTab /> },
    ]
  ), [t]);

  return (
    <div className={styles.wrap}>
      <Text className={styles.title}>{`NFT ${t('nftMarket.title')}`}</Text>

      <NavTabs className={styles.tab} tabItems={tabItems} />
    </div>
  );
};

export { NftMarket };
