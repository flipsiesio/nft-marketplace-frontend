import React from 'react';
import { storiesOf } from '@storybook/react';
import { Text, Card } from 'components';
import Accordion from '.';

const value = {
  title: 'Does Flipsies offer a referral program?',
  content: <Text>Some content</Text>,
};

storiesOf('Basic', module).add('Accordion', () => (
  <Card style={{ width: '85%', margin: '0 auto', minHeight: 250 }}>
    <Accordion value={value} />
  </Card>
));
