import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToggle } from 'hooks';
import {
  Icon, Input, MarketCard, Pagination,
} from 'components';
import { MarketFilterModal } from 'containers/MarketFilterModal';
import img from 'assets/img/card.png';
import { CardDataForList, NftReqDto } from 'types';
import { FilterData } from 'types/containers';
import { nftMarketSelectProfileAction } from 'store/nftMarket/actions';
import styles from '../styles.module.scss';

type Props = {
  items: CardDataForList[]
  link: string
  onUpdate: (filters: NftReqDto) => void
  getPrice: (item: CardDataForList) => string
};

const TabWithFilter: FC<Props> = ({
  items,
  link,
  onUpdate,
  getPrice,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterData>();
  const [page, setPage] = useState(0);

  const { isActive: modalActive, onToggle: toggleModal } = useToggle();

  useEffect(() => {
    onUpdate({
      face: filters?.type,
      suit: filters?.suit,
      limit: 10,
      skip: page * 10,
    });
    // dispatch(nftMarketGetMarketAction({
    //   // sort,
    //   face: filters?.type,
    //   suit: filters?.suit,
    //   limit: 10,
    //   skip: page * 10,
    // }));
  }, [filters, dispatch, page]);

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
            img={item.url || img}
            type={item.face}
            price={getPrice(item)}
            onCardClick={onCardClick}
          />
        ))}
      </div>

      <Pagination page={page} onChange={setPage} />

      <MarketFilterModal
        onApply={setFilters}
        onToggle={toggleModal}
        isOpen={modalActive}
      />
    </div>
  );
};

export { TabWithFilter };
