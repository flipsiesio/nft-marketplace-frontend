/* eslint-disable react/jsx-props-no-spreading,react/destructuring-assignment */
import React, { FC, MouseEventHandler, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { routes } from 'appConstants';
import { useConnectWallet, useShallowSelector } from 'hooks';
import { meSelector, nftMarketSelector, walletSelectors } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { nftMarketSignInAction } from 'store/nftMarket/actions';
import HeaderLink from '../HeaderLink';
import HeaderLangSwitcher from '../HeaderLangSwitcher';
import styles from './styles.module.scss';
import { WalletStatus } from '../../../store/wallet/types';

type Props = {
  isShowLangSwitcherTablet: boolean,
};

const HeaderNavigation: FC<Props> = ({ isShowLangSwitcherTablet }) => {
  const dispatch = useDispatch();
  const {
    status,
    address,
  } = useShallowSelector(walletSelectors.getState);
  const history = useHistory();
  const { t } = useTranslation();
  const { handleConnect } = useConnectWallet();
  const isTutorialShown = useShallowSelector(meSelector.getProp('isTutorialShown'));
  const nftMarketIsAuth = useShallowSelector(nftMarketSelector.getProp('isAuth'));

  const nftMarketHandler = useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
    if (status !== WalletStatus.CONNECTED) {
      handleConnect();
    }
    if (status === WalletStatus.CONNECTED) {
      dispatch(nftMarketSignInAction(() => {
        history.push(routes.nftMarket.root);
      }));
    }
  }, [dispatch, history, status, handleConnect, nftMarketIsAuth]);

  return (
    <nav className={styles.nav}>
      <HeaderLink
        to={routes.nftEarningSystem.root}
        className={cx(styles.nftEarningSystem)}
        text={`NFT ${t('header.nftEarningSystem')}`}
      />
      <HeaderLink
        to={routes.nftMarket.root}
        className={cx(styles.howToPlay, { [styles.blink]: !isTutorialShown })}
        icon="market"
        text={`NFT ${t('header.nftMarket')}`}
        onClick={nftMarketHandler}
      />

      <HeaderLink
        to="#"
        icon="wallet"
        className={cx(
          styles.walletMenu,
          {
            [styles.walletMenuSelected]: status === WalletStatus.CONNECTED,
          },
        )}
        isActive={false}
        isDisabled={status === WalletStatus.CONNECTED}
        text={t(status === WalletStatus.CONNECTED ? address : 'header.wallet')}
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
