/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect } from 'react';
import cx from 'classnames';
import {
  useTable,
  usePagination,
  useExpanded,
  useSortBy,
  Row,
} from 'react-table';
import ReactPaginate from 'react-paginate';
import { Text } from 'components';
import type { TableProps as Props, TableSortBy } from 'types';
import TableRow from './TableRow';
import styles from './styles.module.scss';

const hooks = [
  useSortBy,
  useExpanded,
  usePagination,
];

const Table: FC<Props> = ({
  columns,
  data,
  withPagination = false,
  withSorting = false,
  isLoading = false,
  pageSize = 20,
  count = 0,
  forcePage = undefined,
  className,
  classNameTh,
  classNameRow,
  initialSortBy = undefined,
  onSortBy = () => {},
  onPageChange = () => {},
}) => {
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    page,
    gotoPage,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { sortBy: initialSortBy || [], pageSize },
      manualSortBy: initialSortBy !== undefined,
      useControlledState: (defaultState) => ({
        ...defaultState,
        pageIndex: forcePage || defaultState.pageIndex,
      }),
    },
    ...hooks,
  );

  const handlePageChange = (selected: number) => {
    if (forcePage !== undefined) onPageChange(selected);
    else gotoPage(selected);
  };

  useEffect(() => {
    onSortBy(sortBy as TableSortBy);
  }, [sortBy]);

  return (
    <div className={cx(styles.wrap, className)}>
      <table
        {...getTableProps()}
        className={styles.table}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // condition template from props withSorting
                withSorting ? (
                  <th {...column.getHeaderProps(column.getSortByToggleProps({
                    className: cx(styles.th, classNameTh),
                    style: {
                      width: column.width,
                    },
                  }))}
                  >
                    <div className={styles.sortWrap}>
                      {column.render('Header')}
                      {/* any - because "disableSortBy" is absent into react-table (bug) */}
                      {/* eslint-disable  @typescript-eslint/no-explicit-any */}
                      {(withSorting && !(column as any).disableSortBy) && (
                        <span className={cx(styles.sortArrows, {
                          [styles.desc]: column.isSorted && column.isSortedDesc,
                          [styles.asc]: column.isSorted && !column.isSortedDesc,
                        })}
                        />
                      )}
                    </div>
                  </th>
                ) : (
                  <th {...column.getHeaderProps({
                    className: cx(styles.th, classNameTh),
                  })}
                  >{column.render('Header')}
                  </th>
                )
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.length ? (withPagination ? rows : page).map((row: Row) => {
            prepareRow(row);
            return (
              <TableRow
                key={row.id}
                row={row}
                className={classNameRow}
              />
            );
          }) : (
            <tr>
              <td colSpan={columns.length}>
                <Text className={styles.preloader} align="center">{isLoading ? 'Loading ...' : 'No data found...'}</Text>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {![withPagination, !isLoading, pageSize < (count || data.length)].includes(false) ? (
        <ReactPaginate
          forcePage={forcePage}
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={Math.ceil((count || data.length) / pageSize)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => handlePageChange(selected)}
          containerClassName={styles.pagination}
          pageClassName={styles.paginationItem}
          previousClassName={styles.paginationItem}
          nextClassName={styles.paginationItem}
          disabledClassName={cx(styles.paginationItemDisabled)}
          pageLinkClassName={styles.paginationLink}
          activeLinkClassName={styles.paginationLinkActive}
        />
        /* null condition construction needed, because react-paginate render text block with zero */
      ) : null}
    </div>
  );
};

export default Table;
