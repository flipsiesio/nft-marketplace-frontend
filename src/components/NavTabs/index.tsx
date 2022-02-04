import React, { FC } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { TabItem } from 'types';
import styles from './styles.module.scss';

type Props = {
  tabItems: TabItem[]
  className?: string
};

const NavTabs: FC<Props> = ({
  tabItems,
  className,
}) => {
  return (
    <Tabs className={className}>
      <TabList className={styles.tabList}>
        {tabItems.map(({ title }) => (
          <Tab key={title} selectedClassName={styles.activeTab} className={styles.tab}>{title}</Tab>
        ))}
      </TabList>

      {tabItems.map(({ content, title }) => (
        <TabPanel key={title}>
          {content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

export { NavTabs };
