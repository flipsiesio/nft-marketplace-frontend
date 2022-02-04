import React, { FC, useCallback, useMemo } from 'react';
import {
  Icon, NavTabs, Table, Text,
} from 'components';
import img from 'assets/img/card.png';
import { useHistory } from 'react-router-dom';
import { NftDto, TabItem } from 'types';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import {
  bidCol, bidData, historyCol, historyData,
} from '../cardProfiles/MarketCardProfile';
import { ProfileAttribute } from '../ProfileAttribute';

type Props = {
  buttons: JSX.Element
  selectedNft: NftDto
};

const CardProfile: FC<Props> = ({
  buttons,
  selectedNft,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const tabItems = useMemo<TabItem[]>(() => (
    [
      {
        title: t('nftMarket.tradingHistory'),
        content: <Table className={styles.table} columns={historyCol} data={historyData} />,
      },
      {
        title: t('nftMarket.bids'),
        content: <Table className={styles.table} columns={bidCol} data={bidData} />,
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
          <Text>{t('nftMarket.owner')} <Text tag="span" className={styles.primary}>0x...12exOs</Text></Text>
          <Text>{`${t('nftMarket.attributes')}:`}</Text>
        </div>
        <div className={styles.info}>
          <img className={styles.img} src={img} alt="img" />

          <div className={styles.mobileBodyLabels}>
            <Text>ID <Text tag="span" className={styles.bold}>{`#${selectedNft.id}`}</Text></Text>
            <Text>{t('nftMarket.owner')} <Text tag="span" className={styles.primary}>0x...12exOs</Text></Text>
          </div>

          <div className={styles.content}>
            <div className={styles.rowWrap}>
              <ProfileAttribute className={styles.profileAttribute} head="Suit" value="Hearts" percent="25%" />
              <ProfileAttribute className={styles.profileAttribute} head="Suit" value="Hearts" percent="25%" />
              <ProfileAttribute className={styles.profileAttribute} head="Suit" value="Hearts" percent="25%" />
              <ProfileAttribute className={styles.profileAttribute} head="Suit" value="Hearts" percent="25%" />
              <ProfileAttribute className={styles.profileAttribute} head="Suit" value="Hearts" percent="25%" />
              <ProfileAttribute className={styles.profileAttribute} head="Suit" value="Hearts" percent="25%" />
              <ProfileAttribute className={styles.profileAttribute} head="Suit" value="Hearts" percent="25%" />
              <ProfileAttribute className={styles.profileAttribute} head="Suit" value="Hearts" percent="25%" />
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
