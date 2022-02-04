import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '.';

storiesOf('Basic', module).add('Button', () => {
  const textValue = text('Text', 'Play now!');
  const disabled = boolean('Disabled', false);
  const bold = boolean('Bold', false);
  const icon = boolean('With icon', false);
  const theme = select('Theme', {
    primary: 'primary',
    play: 'play',
    success: 'success',
  }, 'primary');
  const size = select('Size', {
    small: 'small',
    medium: 'medium',
    big: 'big',
  }, 'medium');
  const use = select('Use', {
    default: 'default',
    rounded: 'rounded',
  }, 'default');
  const onClick = action('onClick');

  return (
    <Button
      disabled={disabled}
      theme={theme}
      size={size}
      use={use}
      bold={bold}
      icon={icon ? 'faq' : ''}
      onClick={onClick}
    >
      {textValue}
    </Button>
  );
});
