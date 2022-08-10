import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { walletConnect } from '../store/wallet/actionCreators';

export const useConnectWallet = () => {
  const dispatch = useDispatch();

  const handleConnect = useCallback(() => {
    dispatch(walletConnect());
  }, [dispatch]);

  return {
    handleConnect,
  };
};
