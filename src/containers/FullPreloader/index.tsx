import React, {
  FC,
  PropsWithChildren,
} from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { Logo, Preloader } from 'components';
import styles from './styles.module.scss';

type Props = {
  isLoading: boolean,
  className?: string,
};

const FullPreloader: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  className,
}) => (isLoading ? (
  <div className={cx(styles.wrap, className)}>
    <Preloader isLoading className={styles.preloader}>
      <Logo className={styles.logo} />
    </Preloader>
    <Logo className={styles.logo} />
    {createPortal(<div className={styles.bg} />, document.body)}
  </div>
) : <>{children}</>);

export default FullPreloader;
