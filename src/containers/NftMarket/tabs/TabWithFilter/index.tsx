import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useDebounce, useToggle } from 'hooks';
import {
  Icon, Input, MarketCard, Pagination, Text,
} from 'components';
import { MarketFilterModal } from 'containers/MarketFilterModal';
import img from 'assets/img/card.png';
import { CardDataForList, NftReqDto } from 'types';
import { FilterData } from 'types/containers';
import { nftMarketSelectProfileAction } from 'store/nftMarket/actions';
import { PAGE_ITEM_LIMIT } from 'appConstants';
import styles from '../styles.module.scss';

type Props = {
  items: CardDataForList[],
  linkBid: string,
  linkSale: string,
  onUpdate: (filters: NftReqDto) => void,
  getPrice: (item: CardDataForList) => string,
  pageCount: number,
  isSale?: boolean,
};

const TabWithFilter: FC<Props> = ({
  items,
  linkBid,
  linkSale,
  onUpdate,
  getPrice,
  pageCount,
  isSale,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterData>();
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const debounceSearchTerm = useDebounce(searchTerm);

  const { isActive: modalActive, onToggle: toggleModal } = useToggle();

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const filterUrl = search.get('filter');
    const data: NftReqDto = {
      order: filters?.price,
      faces: filters?.type ? Array.from(filters.type) : undefined,
      suits: filters?.suit ? Array.from(filters.suit) : undefined,
      limit: PAGE_ITEM_LIMIT,
      skip: page * PAGE_ITEM_LIMIT,
      cardsId: debounceSearchTerm.length > 0 ? [debounceSearchTerm] : undefined,
      active: true,
    };

    if (filterUrl === 'bids') data.stateBids = true;
    if (filterUrl === 'sale') data.stateSale = true;

    onUpdate(data);
  }, [filters, dispatch, page, debounceSearchTerm, location.search]);

  const onFilterApply = useCallback((data: FilterData) => {
    setPage(0);
    setFilters(data);
  }, []);

  const onCardClick = useCallback((link: string) => (id: number) => {
    dispatch(nftMarketSelectProfileAction(undefined));
    history.push({
      pathname: link,
      search: `?id=${id}`,
    });
  }, [dispatch]);

  const searchHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setSearchTerm(e.currentTarget.value.replace(/[^0-9.]/g, ''));
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.searchWrap}>
        <div className={styles.search}>
          <Icon className={styles.searchIcon} icon="search" />
          <Input
            classNameWrap={styles.searchInputWrap}
            className={styles.searchInput}
            placeholder={t('nftMarket.id')}
            value={searchTerm}
            onChange={searchHandler}
          />
        </div>
        <button className={styles.filterButton} type="button" onClick={toggleModal}>
          <Icon className={styles.filterIcon} icon="filter" />
        </button>
      </div>

      <div className={styles.cardContainer}>
        {items.length === 0 && (
          <Text className={styles.emptyLabel}>{t('nftMarket.empty')}</Text>
        )}
        {items.map((item) => (
          <MarketCard
            priceLabel={item.state_sale ? t('nftMarket.price') : t('nftMarket.highestBid')}
            active={item.state_sale?.active || item.state_bids?.active || false}
            className={styles.card}
            key={item.cardId}
            id={item.cardId}
            img={item.url || img}
            type={item.face}
            price={getPrice(item)}
            onCardClick={onCardClick(item.state_sale ? linkSale : linkBid)}
          />
        ))}
      </div>

      <Pagination pageCount={pageCount} page={page} onChange={setPage} />

      <MarketFilterModal
        onApply={onFilterApply}
        onToggle={toggleModal}
        isOpen={modalActive}
        isSale={isSale}
      />
    </div>
  );
};

export { TabWithFilter };
