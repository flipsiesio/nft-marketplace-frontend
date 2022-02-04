import React, {
  useState,
  FC,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import {
  Logo,
  Link,
  Burger,
  OutsideClick,
  Avatar,
  ButtonOpenGameCombination,
} from 'components';
import {
  routes,
  MIN_DESKTOP_WIDTH,
} from 'appConstants';
import { GameCombinationsContext } from 'containers';
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

  const { isOpenGameCombination, setIsOpenGameCombination } = useContext(GameCombinationsContext);

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
      <OutsideClick
        tag="header"
        className={styles.header}
        onClick={() => {
          if ((window.innerWidth <= MIN_DESKTOP_WIDTH) && isNavVisible) setNavVisible(false);
        }}
      >
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

          {isGamePath && (
            <ButtonOpenGameCombination
              className={styles.rankingsBtn}
              handlerOpen={() => setIsOpenGameCombination(!isOpenGameCombination)}
            />
          )}

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
      </OutsideClick>
    </>
  );
};

export default Header;
