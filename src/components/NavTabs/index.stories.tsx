import React from 'react';
import { storiesOf } from '@storybook/react';
import { NavTabs } from '.';

storiesOf('Basic', module).add('NavTabs', () => (
  <NavTabs tabItems={[
    { title: 'nav 1', content: (<div>nav 1</div>) },
    { title: 'nav 2', content: (<div>nav 2</div>) },
  ]}
  />
));
