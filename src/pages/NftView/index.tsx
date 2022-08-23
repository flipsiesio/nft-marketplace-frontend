import {
  Button, Input, Pagination, Text,
} from 'components';
import { MarketFilterModal } from 'containers';
import { useToggle } from 'hooks';
import React, { FC, useState, useEffect } from 'react';
import { marketClient } from 'store/api';
import { CardData } from 'types';
import { FilterData } from 'types/containers';
import styles from './styles.module.scss';

export const NftView: FC = () => {
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);
  const [size, setSize] = useState('220');
  const [data, setData] = useState<CardData[]>([]);
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState<FilterData>();

  const { onToggle, isActive } = useToggle();

  useEffect(() => {
    marketClient.get<CardData[]>('/marketplace/card-list', {
      params: {
        order: filters?.price,
        faces: filters?.type ? Array.from(filters.type) : undefined,
        suits: filters?.suit ? Array.from(filters.suit) : undefined,
        skip: page * 20,
        limit: 20,
        cardsId: search.length ? [search] : undefined,
      },
    }).then((res) => setData(res.data));
  }, [page, search, filters]);

  useEffect(() => {
    marketClient.get<number>('/marketplace/card-list', {
      params: {
        order: filters?.price,
        faces: filters?.type ? Array.from(filters.type) : undefined,
        suits: filters?.suit ? Array.from(filters.suit) : undefined,
        count: true,
      },
    }).then((res) => setCount(Math.ceil(res.data / 20)));
  }, [filters]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <Button onClick={onToggle}>Filters</Button>
      </div>
      <div className={styles.inputWrapper}>
        <Text>Search id: </Text>
        <Input value={search} onChange={(e) => setSearch(e.currentTarget.value)} type="number" />
      </div>
      <div className={styles.inputWrapper}>
        <Text>Nft size: </Text>
        <Input value={size} onChange={(e) => setSize(e.currentTarget.value)} type="number" />
      </div>
      <div className={styles.cardWrapper}>
        {data.map((d) => (
          <img key={d.url} style={{ width: `${size}px` }} className={styles.img} src={d.url} alt="card" />
        ))}
      </div>
      <Pagination page={page} pageCount={count} onChange={setPage} />
      <MarketFilterModal
        onApply={(f) => {
          setFilters(f);
          setPage(0);
        }}
        onToggle={onToggle}
        isOpen={isActive}
        isSale={false}
      />
    </div>
  );
};
