import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import Preloader from '.';

storiesOf('Basic', module).add('Preloader', () => {
  const isLoading = boolean('isLoading', true);

  return <Preloader isLoading={isLoading} />;
});
