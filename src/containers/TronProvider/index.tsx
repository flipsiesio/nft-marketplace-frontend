import React, { FC, PropsWithChildren } from 'react';
import { useShallowSelector } from 'hooks';
import { walletSelectors } from 'store/selectors';
import { FullPreloader } from 'containers';
import { WalletStatus } from '../../store/wallet/types';

const TronProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const status = useShallowSelector(walletSelectors.getProp('status'));
  return (
    <FullPreloader
      isLoading={status === WalletStatus.LOADING}
    >
      {children}
    </FullPreloader>
  );
};

export default TronProvider;
