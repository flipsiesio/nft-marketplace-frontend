import React, { FC } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  value: number,
  className?: string,
  transitionTimeout?: number,
};

const ProgressBar: FC<Props> = ({ value, className, transitionTimeout = 200 }) => (
  <div className={cx(styles.wrap, className)}>
    <span
      className={styles.line}
      style={{
        width: `${value}%`,
        transition: `${transitionTimeout}ms width`,
      }}
    />
  </div>
);

export default ProgressBar;
