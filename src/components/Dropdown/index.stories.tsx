import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Dropdown } from '.';

storiesOf('Basic', module).add('Dropdown', () => {
  const textValue = text('Text', 'Text');
  const isActive = boolean('IsActive', true);
  const onToggle = action('onToggle');

  return (
    <Dropdown isActive={isActive} label={textValue} onToggle={onToggle}>
      Content
    </Dropdown>
  );
});
