import React, { FC } from 'react';
import cx from 'classnames';
import { Link as ReactRouterDomLink, LinkProps } from 'react-router-dom';
import styles from './styles.module.scss';

const Link: FC<LinkProps> = ({
  to,
  children,
  className,
  onClick,
}) => (
  <ReactRouterDomLink
    to={to}
    className={cx(styles.link, className)}
    onClick={onClick}
  >
    {children}
  </ReactRouterDomLink>
);

export default Link;
