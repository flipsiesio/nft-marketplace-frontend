import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import Table from '.';

const data = [
  {
    firstName: 'John',
    lastName: 'Snow',
    status: 'alive',
    age: 21,
    visits: 55,
    progress: 100,
  },
  {
    firstName: 'Daenerys',
    lastName: 'Targarien',
    status: 'dead',
    age: 22,
    visits: 120,
    progress: 95,
  },
  {
    firstName: 'Daenerys',
    lastName: 'Targarien',
    status: 'dead',
    age: 22,
    visits: 120,
    progress: 95,
  },
  {
    firstName: 'Daenerys',
    lastName: 'Targarien',
    status: 'dead',
    age: 22,
    visits: 120,
    progress: 95,
  },
  {
    firstName: 'Daenerys',
    lastName: 'Targarien',
    status: 'dead',
    age: 22,
    visits: 120,
    progress: 95,
  },
];

const columns = [
  { Header: 'First Name', accessor: 'firstName' },
  { Header: 'Progress', accessor: 'progress' },
  { Header: 'Last Name', accessor: 'lastName' },
  { Header: 'Age', accessor: 'age' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Visits', accessor: 'visits' },
];

storiesOf('Basic', module).add('Table', () => {
  const withPagination = boolean('With pagination', true);

  return (
    <Table
      data={data}
      columns={columns}
      withPagination={withPagination}
      pageSize={3}
    />
  );
});
