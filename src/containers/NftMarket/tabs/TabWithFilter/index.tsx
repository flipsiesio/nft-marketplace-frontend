import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToggle } from 'hooks';
import { Icon, Input, MarketCard } from 'components';
import { MarketFilterModal } from 'containers/MarketFilterModal';
import img from 'assets/img/card.png';
import { CardMetadata } from 'types';
import { FilterData } from 'types/containers';
import { nftMarketGetMarketAction, nftMarketSelectProfileAction } from 'store/nftMarket/actions';
import styles from '../styles.module.scss';

type Props = {
  items: CardMetadata[]
  link: string
};

const TabWithFilter: FC<Props> = ({
  items,
  link,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const { isActive: modalActive, onToggle: toggleModal } = useToggle();

  const applyFilters = useCallback((data: FilterData) => {
    console.log(data);
    // let sort: NftReqDto['sort'] = { price: false };
    //
    // if (data.price.highestPrice) {
    //   sort = { price: true };
    // }
    //
    // if (data.price.highestBid) {
    //   sort = { bid: true };
    // }

    dispatch(nftMarketGetMarketAction({
      // sort,
      face: data.type,
      suit: data.suit,
      limit: 10,
      skip: 0,
    }));
  }, [dispatch]);

  const onCardClick = useCallback((id: number) => {
    dispatch(nftMarketSelectProfileAction(undefined));
    history.push({
      pathname: link,
      search: `?id=${id}`,
    });
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
        {items.map((item) => (
          <MarketCard
            className={styles.card}
            key={item.cardId}
            id={item.cardId}
            img={item.metadata.url || img}
            type={item.face}
            price="123"
            onCardClick={onCardClick}
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
