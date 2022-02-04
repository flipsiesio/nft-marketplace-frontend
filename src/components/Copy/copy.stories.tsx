import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Copy from '.';

storiesOf('Basic', module).add('Copy', () => {
  const value = text('Value', 'valueToCopy');
  const afterCopy = action('afterCopy');

  return (
    <Copy value={value} afterCopy={afterCopy} />
  );
});
