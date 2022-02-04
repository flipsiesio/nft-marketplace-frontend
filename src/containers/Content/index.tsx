import React, { FC, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import { Header, Footer, GameCombinationsProvider } from 'containers';
import { routes } from 'appConstants';
import styles from './styles.module.scss';

type Props = {
  className?: string,
  withHeaderLogo?: boolean,
};

const Content: FC<PropsWithChildren<Props>> = ({
  children,
  withHeaderLogo = true,
  className,
}) => {
  const { pathname } = useLocation();

  return (
    <GameCombinationsProvider>
      <Header
        withLogo={withHeaderLogo}
        pathname={pathname}
      />
      <main className={cx(styles.main, className)}>
        {children}
        <div className={styles.bg} />
      </main>
      {![routes.notFound.root, routes.game.root].includes(pathname) && <Footer />}
    </GameCombinationsProvider>
  );
};

export default Content;
