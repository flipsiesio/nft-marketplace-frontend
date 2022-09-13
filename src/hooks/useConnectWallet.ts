import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { walletConnect } from '../store/wallet/actionCreators';
import { useShallowSelector } from './index';
import { nftMarketSelector, walletSelectors } from '../store/selectors';
import { WalletStatus } from '../store/wallet/types';

export const useConnectWallet = () => {
  const accessToken = useShallowSelector(nftMarketSelector.getProp('accessToken'));
  const status = useShallowSelector(walletSelectors.getProp('status'));
  const dispatch = useDispatch();

  const handleConnect = useCallback(() => {
    if (status !== WalletStatus.CONNECTED) {
      dispatch(walletConnect());
    }
  }, [dispatch, status]);

  const connectOnStart = useCallback(() => {
    console.log(accessToken);
    if (status === WalletStatus.CONNECTED) {
      dispatch(walletConnect());
    }
  }, [dispatch]);

  return {
    handleConnect,
    connectOnStart,
  };
};
