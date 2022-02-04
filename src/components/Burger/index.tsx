import React, { FC } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  isActive?: boolean,
  className?: string,
  onClick?: () => void,
};

const Burger: FC<Props> = ({
  isActive = false,
  className,
  onClick = () => {},
}) => (
  <button
    type="button"
    className={cx(
      styles.btn,
      isActive && styles.btnActive,
      className,
    )}
    onClick={onClick}
  >
    <span className={styles.icon} />
  </button>
);

export default Burger;
