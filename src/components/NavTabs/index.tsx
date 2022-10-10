import React, {
  FC, useMemo, useState, useCallback, Fragment,
} from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { TabItem } from 'types';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import styles from './styles.module.scss';
import { history } from '../../utils';

type Props = {
  tabItems: TabItem[]
  className?: string
  shouldSearch?: boolean
  tabClassName?: string
};

const NavTabs: FC<Props> = ({
  tabItems,
  className,
  shouldSearch = true,
  tabClassName,
}) => {
  const location = useLocation();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  const selectedIndex = useMemo(() => {
    const search = new URLSearchParams(location.search);
    const tab = search.get('tab');
    const result = tabItems.findIndex((fTab) => fTab.title === tab);
    return result === -1 ? 0 : result;
  }, [location, tabItems]);

  const onSelect = useCallback((activeTab: number) => {
    const param = new URLSearchParams(location.search);
    param.set('tab', tabItems[activeTab].title);

    history.push({ search: param.toString() });
    const item = tabItems[activeTab];
    if (item && item.menu) {
      setIsShowMenu((state) => !state);
    } else {
      setIsShowMenu(false);
    }
  }, [selectedIndex]);

  return (
    <>
      <Tabs
        selectedIndex={shouldSearch ? selectedIndex : undefined}
        onSelect={shouldSearch ? onSelect : undefined}
        className={className}
      >
        <TabList className={styles.tabList}>
          {tabItems.map(({ title, menu }, index) => (
            <Fragment key={`tab-${title}`}>
              <Tab
                selectedClassName={styles.activeTab}
                className={cx(styles.tab, tabClassName)}
              >
                {title}
              </Tab>
              {isShowMenu && selectedIndex === index && menu && (
                <div className={styles.containerMenu} onMouseLeave={() => setIsShowMenu(false)} key={`menu-${title}`}>
                  <ul className={styles.listMenu} key={`ul-${title}`}>
                    {menu.map(({ title: titleMenu }) => (
                      <li className={styles.itemMenu} key={`li-${titleMenu}`}>
                        <button className={styles.linkMenu} type="button">
                          {titleMenu}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Fragment>
          ))}
        </TabList>

        {tabItems.map(({ content, title }) => (
          <TabPanel key={title}>
            {content}
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
};

export { NavTabs };
