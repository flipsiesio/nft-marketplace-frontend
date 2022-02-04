import React, { FC, PropsWithChildren, MouseEventHandler } from 'react';
import cx from 'classnames';
import { Icon, Text, NavLink } from 'components';
import styles from './styles.module.scss';

type Props = {
  to: string,
  icon: string,
  text: string,
  isActive?: boolean,
  className?: string,
  isDisabled?: boolean,
  onClick?: MouseEventHandler<HTMLAnchorElement>,
};

const HeaderLink: FC<PropsWithChildren<Props>> = ({
  to,
  icon,
  text,
  className,
  isDisabled,
  isActive,
  children,
  onClick = () => {},
}) => (
  <NavLink
    to={to}
    className={cx(
      styles.link,
      className,
      {
        [styles.linkActive]: isActive && !isDisabled,
        [styles.disabled]: isDisabled,
      },
    )}
    activeClassName={cx({
      [styles.linkActive]: isActive === undefined && !isDisabled,
    })}
    onClick={onClick}
  >
    <Icon icon={icon} className={styles.icon} />
    <Text tag="span" className={styles.linkText}>{text}</Text>
    {children}
  </NavLink>
);

export default HeaderLink;
