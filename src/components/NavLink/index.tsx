/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import cx from 'classnames';
import { NavLink as ReactRouterDomNavLink, NavLinkProps } from 'react-router-dom';
import styles from './styles.module.scss';

const Link: FC<NavLinkProps> = ({
  to,
  children,
  className,
  onClick,
  ...props
}) => (
  <ReactRouterDomNavLink
    {...props}
    to={to}
    className={cx(styles.link, className)}
    onClick={onClick}
  >
    {children}
  </ReactRouterDomNavLink>
);

export default Link;
