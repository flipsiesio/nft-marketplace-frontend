import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, H3 } from 'components';
import { action } from '@storybook/addon-actions';
import OutsideClick from '.';

const outsideClickHandler = action('Clicked outside!');

storiesOf('Basic', module).add('OutsideClick', () => (
  <OutsideClick onClick={outsideClickHandler}>
    <Card>
      <H3>Click outside of the Card!</H3>
    </Card>
  </OutsideClick>
));
