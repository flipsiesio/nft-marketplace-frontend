import React, { FC, PropsWithChildren } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type Size = 'normal';
type Props = {
  isLoading: boolean,
  className?: string,
  size?: Size,
};

const Preloader: FC<PropsWithChildren<Props>> = ({
  isLoading,
  children,
  className,
  size = 'normal',
}) => (
  isLoading ? (
    <div
      className={cx(
        styles.preloader,
        className,
        styles[size],
      )}
    >
      <span />
      <span />
      <span />
    </div>
  ) : <>{children}</>
);

export default Preloader;
