import React, { FC } from 'react';
import cx from 'classnames';
import {
  Menu, MenuItem, MenuButton, SubMenu, MenuDivider,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import styles from './styles.module.scss';

const menuItemClassName = ({ hover, active }: { hover: boolean, active: boolean }) => {
  if (active) {
    return styles.menuItemActive;
  } if (hover) {
    return styles.menuItemHover;
  }
  return styles.menuItem;
};

type Props = {
  className?: string
};

export const SelectToken:FC<Props> = ({ className }) => {
  return (
    <Menu
      menuButton={<MenuButton className={styles.buttonForChoose}>BTT</MenuButton>}
      transition
      menuClassName={cx(styles.container, className)}
      // eslint-disable-next-line no-console
      onItemClick={(e) => console.log(`[Menu] ${e.value} clicked`)}
    >
      <MenuItem className={menuItemClassName}>BTT</MenuItem>
      <MenuDivider className={styles.divider} />
      <SubMenu label="USDT" className={cx(styles.submenuItem)} menuClassName={cx(styles.container)}>
        <MenuItem className={menuItemClassName}>USDT-eth</MenuItem>
        <MenuDivider className={styles.divider} />
        <MenuItem className={menuItemClassName}>USDT-tron</MenuItem>
        <MenuDivider className={styles.divider} />
        <MenuItem className={menuItemClassName}>USDT-bsc</MenuItem>
      </SubMenu>
      <MenuDivider className={styles.divider} />
      <SubMenu label="USDC" className={cx(styles.submenuItem)} menuClassName={cx(styles.container)}>
        <MenuItem className={menuItemClassName} value="USDC-e">USDC-eth</MenuItem>
        <MenuDivider className={styles.divider} />
        <MenuItem className={menuItemClassName} value="USDC-t">USDC-tron</MenuItem>
        <MenuDivider className={styles.divider} />
        <MenuItem className={menuItemClassName} value="USDC-b">USDC-bsc</MenuItem>
      </SubMenu>
      <MenuDivider className={styles.divider} />
      <MenuItem className={menuItemClassName}>BNB</MenuItem>
      <MenuDivider className={styles.divider} />
      <MenuItem className={menuItemClassName}>TRX</MenuItem>
      <MenuDivider className={styles.divider} />
      <MenuItem className={menuItemClassName}>ETH</MenuItem>
    </Menu>
  );
};
