import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { H3 } from 'components';
import Modal from '.';

const onClose = action('onClose');

storiesOf('Basic', module).add('Modal', () => (
  <Modal isOpen onClose={onClose}>
    <H3>Modal content</H3>
  </Modal>
));
