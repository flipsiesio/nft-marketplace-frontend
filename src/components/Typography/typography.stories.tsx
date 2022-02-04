import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  Text,
} from '.';

storiesOf('Basic', module).add('Typography', () => {
  const align = select(
    'Align',
    {
      left: 'left',
      center: 'center',
      right: 'right',
    },
    'left',
  );
  const color = select(
    'Color',
    {
      white: 'white',
      error: 'error',
      success: 'success',
    },
    'white',
  );
  const bold = boolean('Paragraph bold', false);
  const paragraphSize = select(
    'Paragraph size',
    {
      small: 'small',
      medium: 'medium',
      big: 'big',
    },
    'medium',
  );

  return (
    <div>
      <H1 align={align} color={color}>H1 heading</H1>
      <H2 align={align} color={color}>H2 heading</H2>
      <H3 align={align} color={color}>H3 heading</H3>
      <H4 align={align} color={color}>H4 heading</H4>
      <H5 align={align} color={color}>H5 heading</H5>
      <Text align={align} color={color} bold={bold} size={paragraphSize}>Paragraph text</Text>
    </div>
  );
});
