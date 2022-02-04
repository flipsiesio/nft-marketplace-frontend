import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'hooks';
import { Icon, Input, MarketCard } from 'components';
import { MarketFilterModal } from 'containers/MarketFilterModal';
import img from 'assets/img/card.png';
import { NftReqDto, NftRes } from 'types';
import { FilterData } from 'types/containers';
import { useDispatch } from 'react-redux';
import { nftMarketGetGalleryAction } from 'store/nftMarket/actions';
import styles from '../styles.module.scss';

type Props = {
  items: NftRes[]
  link: string
};

const TabWithFilter: FC<Props> = ({
  items,
  link,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { isActive: modalActive, onToggle: toggleModal } = useToggle();

  const applyFilters = useCallback((data: FilterData) => {
    let sort: NftReqDto['sort'] = { price: false };

    if (data.price.highestPrice) {
      sort = { price: true };
    }

    if (data.price.highestBid) {
      sort = { bid: true };
    }

    dispatch(nftMarketGetGalleryAction({
      sort,
      filter: {
        suit: data.suit,
        type: data.type,
      },
      limit: 10,
      skip: 0,
    }));
  }, [dispatch]);

  return (
    <div className={styles.wrap}>
      <div className={styles.searchWrap}>
        <div className={styles.search}>
          <Icon className={styles.searchIcon} icon="search" />
          <Input
            classNameWrap={styles.searchInputWrap}
            className={styles.searchInput}
            placeholder={t('nftMarket.id')}
          />
        </div>
        <button className={styles.filterButton} type="button" onClick={toggleModal}>
          <Icon className={styles.filterIcon} icon="filter" />
        </button>
      </div>

      <div className={styles.cardContainer}>
        {items.map(({ cardId }) => (
          <MarketCard
            className={styles.card}
            key={cardId}
            link={link}
            id={cardId}
            img={img}
            type="King" // TODO get type and price
            price="10"
          />
        ))}
      </div>

      <MarketFilterModal
        onApply={applyFilters}
        onToggle={toggleModal}
        isOpen={modalActive}
      />
    </div>
  );
};

export { TabWithFilter };
