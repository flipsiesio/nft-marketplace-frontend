import React, { FC, useCallback } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import styles from './styles.module.scss';
import { Icon } from '../index';

type Props = {
  page?: number
  pageCount?: number
  onChange?: (page: number) => void
};

export const Pagination: FC<Props> = ({
  page = 0,
  pageCount = 10,
  onChange,
}) => {
  const clickHandler = useCallback<Required<ReactPaginateProps>['onPageChange']>((e) => {
    if (onChange) onChange(e.selected);
  }, [onChange]);
  return (
    <ReactPaginate
      forcePage={page}
      onPageChange={clickHandler}
      breakLinkClassName={styles.page}
      activeLinkClassName={styles.pageActive}
      pageLinkClassName={styles.page}
      className={styles.pagination}
      nextLinkClassName={styles.page}
      previousLinkClassName={styles.page}
      pageCount={pageCount || 1}
      nextLabel={
        <Icon className={styles.nextArrow} icon="chevron" />
      }
      previousLabel={
        <Icon className={styles.prevArrow} icon="chevron" />
      }
    />
  );
};
