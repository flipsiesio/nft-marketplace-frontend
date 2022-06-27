import React, { FC } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string
  url: string
  active?: boolean
};

export const NotActiveCardIcon: FC<Props> = ({
  url,
  active = true,
  className,
}) => {
  return (
    <div className={cx(styles.imgWrapper, className)}>
      {!active && (
        <div className={styles.error}>
          <div className={cx(styles.line, styles.lineTR)} />
          <div className={cx(styles.line, styles.lineTL)} />
          <div className={cx(styles.line, styles.lineBL)} />
          <div className={cx(styles.line, styles.lineBR)} />
          <p className={styles.errorLabel}>Not Active</p>
        </div>
      )}
      <img alt="card" src={url} className={styles.img} />
    </div>
  );
};
