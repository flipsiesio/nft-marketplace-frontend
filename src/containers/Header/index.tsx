import React, {
  useState,
  FC,
  useEffect,
  useMemo,
} from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import {
  Logo,
  Link,
  Burger,
  Avatar,
} from 'components';
import {
  routes,
  MIN_DESKTOP_WIDTH,
} from 'appConstants';
import { useWindowResize } from 'hooks';
import HeaderNavigation from './HeaderNavigation';
import HeaderLangSwitcher from './HeaderLangSwitcher';
import styles from './styles.module.scss';

type Props = {
  withLogo?: boolean,
  pathname: string,
};

const Header: FC<Props> = ({ withLogo = true, pathname }) => {
  const [isNavVisible, setNavVisible] = useState<boolean>(false);

  const history = useHistory();

  const isGamePath = useMemo(() => pathname === routes.game.root, [pathname]);

  useWindowResize(() => setNavVisible((window.innerWidth >= MIN_DESKTOP_WIDTH)));

  useEffect(() => {
    return history.listen(() => {
      if (window.innerWidth < MIN_DESKTOP_WIDTH) {
        setNavVisible(false);
      }
    });
  }, []);

  return (
    <>
      <div className={styles.content}>
        {(withLogo && (window.innerWidth > MIN_DESKTOP_WIDTH)) && (
        <Link to={routes.main.root}>
          <Logo
            view="flipsies"
            className={styles.logo}
          />
        </Link>
        )}

        {isNavVisible && (
        <HeaderNavigation isShowLangSwitcherTablet={isGamePath} />
        )}

        <Burger
          isActive={isNavVisible}
          className={styles.mobile}
          onClick={() => setNavVisible(!isNavVisible)}
        />

        <div className={styles.actions}>
          <HeaderLangSwitcher className={cx(
            styles.mobileLangSwitcher,
            isGamePath && styles.isGame,
          )}
          />
          <Link
            to={routes.main.root}
            className={cx(styles.avatarWrap, styles.mobile)}
          >
            <Avatar className={cx(styles.avatar, isGamePath && styles.isGame)} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
