import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { H3 } from 'components/index';
import NeedExtensionModal from '.';

const onClose = action('onClose');

storiesOf('Basic', module).add('Need extension modal', () => (
  <NeedExtensionModal isOpen onClose={onClose}>
    <H3>Modal content</H3>
  </NeedExtensionModal>
));
