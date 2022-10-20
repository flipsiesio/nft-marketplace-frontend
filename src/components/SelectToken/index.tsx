import React, { FC } from 'react';
import cx from 'classnames';
import { Token } from 'types';
import { tokens } from 'appConstants';
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

const convertName: Record<string, keyof typeof tokens> = {
  BTT: 'Native',
  'USDT-eth': 'USDT-E',
  'USDT-tron': 'USDT-T',
  'USDT-bsc': 'USDT-B',
  'USDC-eth': 'USDC-E',
  'USDC-tron': 'USDC-T',
  'USDC-bsc': 'USDC-B',
  BNB: 'BNB',
  TRX: 'TRX',
  ETH: 'Ethereum',
};

type Props = {
  className?: string,
  value: string,
  onSelect: (
    token: Token,
  ) => void,
};

export const SelectToken:FC<Props> = ({ className, onSelect, value }) => {
  return (
    <Menu
      menuButton={<MenuButton className={styles.buttonForChoose}>{value}</MenuButton>}
      transition
      menuClassName={cx(styles.container, className)}
      onItemClick={(e) => onSelect({
        address: tokens[convertName[e.value] ?? 'Native'].address,
        price: tokens[convertName[e.value] ?? 'Native'].price,
        decimals: tokens[convertName[e.value] ?? 'Native'].decimals,
        label: e.value,
      })}
    >
      <MenuItem className={menuItemClassName} value="BTT"><span>BTT</span></MenuItem>
      <MenuDivider className={styles.divider} />
      <SubMenu label="USDT" className={cx(styles.submenuItem)} menuClassName={cx(styles.container)}>
        <MenuItem className={menuItemClassName} value="USDT-eth"><span>USDT-eth</span></MenuItem>
        <MenuDivider className={styles.divider} />
        <MenuItem className={menuItemClassName} value="USDT-tron"><span>USDT-tron</span>n</MenuItem>
        <MenuDivider className={styles.divider} />
        <MenuItem className={menuItemClassName} value="USDT-bsc"><span>USDT-bsc</span></MenuItem>
      </SubMenu>
      <MenuDivider className={styles.divider} />
      <SubMenu label="USDC" className={cx(styles.submenuItem)} menuClassName={cx(styles.container)}>
        <MenuItem className={menuItemClassName} value="USDC-eth"><span>USDC-eth</span></MenuItem>
        <MenuDivider className={styles.divider} />
        <MenuItem className={menuItemClassName} value="USDC-tron"><span>USDC-tron</span></MenuItem>
        <MenuDivider className={styles.divider} />
        <MenuItem className={menuItemClassName} value="USDC-bsc"><span>USDC-bsc</span></MenuItem>
      </SubMenu>
      <MenuDivider className={styles.divider} />
      <MenuItem className={menuItemClassName} value="BNB"><span>BNB</span></MenuItem>
      <MenuDivider className={styles.divider} />
      <MenuItem className={menuItemClassName} value="TRX"><span>TRX</span></MenuItem>
      <MenuDivider className={styles.divider} />
      <MenuItem className={menuItemClassName} value="ETH"><span>ETH</span></MenuItem>
    </Menu>
  );
};
