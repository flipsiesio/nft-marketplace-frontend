import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import LoadingModal from '.';

storiesOf('Basic', module).add('LoadingModal', () => {
  const title = text('Title', 'Waiting for the response from Oracle.');
  return (
    <LoadingModal isLoading title={title} />
  );
});
