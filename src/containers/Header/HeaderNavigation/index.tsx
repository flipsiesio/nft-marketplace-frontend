/* eslint-disable react/jsx-props-no-spreading,react/destructuring-assignment */
import React, { FC, MouseEventHandler, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { routes, TronStatus } from 'appConstants';
import { useConnectWallet, useShallowSelector } from 'hooks';
import { meSelector, nftMarketSelector, tronSelector } from 'store/selectors';
import { useDispatch } from 'react-redux';
import HeaderLink from '../HeaderLink';
import HeaderLangSwitcher from '../HeaderLangSwitcher';
import styles from './styles.module.scss';
import { nftMarketSignInAction } from '../../../store/nftMarket/actions';

type Props = {
  isShowLangSwitcherTablet: boolean,
};

const HeaderNavigation: FC<Props> = ({ isShowLangSwitcherTablet }) => {
  const dispatch = useDispatch();
  const {
    status: tronStatus,
    address,
  } = useShallowSelector(tronSelector.getState);
  const history = useHistory();
  const { t } = useTranslation();
  const { handleConnect } = useConnectWallet();
  const isTutorialShown = useShallowSelector(meSelector.getProp('isTutorialShown'));
  const nftMarketIsAuth = useShallowSelector(nftMarketSelector.getProp('isAuth'));

  const nftMarketHandler = useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
    if (tronStatus === TronStatus.ADDRESS_SELECTED) {
      dispatch(nftMarketSignInAction(() => {
        history.push(routes.nftMarket.root);
      }));
    }

    if (tronStatus !== TronStatus.ADDRESS_SELECTED) {
      handleConnect(routes.nftMarket.root);
    }
  }, [dispatch, history, tronStatus, handleConnect, nftMarketIsAuth]);

  return (
    <nav className={styles.nav}>
      <HeaderLink
        to={routes.nftEarningSystem.root}
        className={cx(styles.nftEarningSystem)}
        text={t('header.nftEarningSystem')}
      />
      <HeaderLink
        to={routes.nftMarket.root}
        className={cx(styles.howToPlay, { [styles.blink]: !isTutorialShown })}
        icon="market"
        text={t('header.nftMarket')}
        onClick={nftMarketHandler}
      />

      <HeaderLink
        to="#"
        icon="wallet"
        className={cx(
          styles.walletMenu,
          {
            [styles.walletMenuSelected]: tronStatus === TronStatus.ADDRESS_SELECTED,
          },
        )}
        isActive={false}
        isDisabled={tronStatus === TronStatus.ADDRESS_SELECTED}
        text={t(tronStatus === TronStatus.ADDRESS_SELECTED ? address : 'header.wallet')}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleConnect();
        }}
      />

      <HeaderLangSwitcher className={cx(
        styles.langMenu,
        isShowLangSwitcherTablet && styles.isShowMobile,
      )}
      />
    </nav>
  );
};

export default HeaderNavigation;
