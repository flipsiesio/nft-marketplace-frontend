import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BlurModal from '.';

const onClose = action('onClose');

storiesOf('Basic', module).add('LoadingModal', () => {
  return (
    <BlurModal
      isOpen
      onClose={onClose}
    >
      Test
    </BlurModal>
  );
});
