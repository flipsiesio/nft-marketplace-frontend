import React, { FC, useMemo } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { TabItem } from 'types';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { history } from '../../utils';

type Props = {
  tabItems: TabItem[]
  className?: string
  shouldSearch?: boolean
};

const NavTabs: FC<Props> = ({
  tabItems,
  className,
  shouldSearch = true,
}) => {
  const location = useLocation();
  const onSelect = (activeTab: number) => {
    const param = new URLSearchParams(location.search);
    param.set('tab', tabItems[activeTab].title);

    history.push({ search: param.toString() });
  };

  const selectedIndex = useMemo(() => {
    const search = new URLSearchParams(location.search);
    const tab = search.get('tab');
    const result = tabItems.findIndex((fTab) => fTab.title === tab);
    return result === -1 ? 0 : result;
  }, [location, tabItems]);

  return (
    <Tabs
      selectedIndex={shouldSearch ? selectedIndex : undefined}
      onSelect={shouldSearch ? onSelect : undefined}
      className={className}
    >
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
