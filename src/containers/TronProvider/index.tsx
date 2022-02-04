import React, { PropsWithChildren, FC } from 'react';
import { useShallowSelector } from 'hooks';
import { uiSelector } from 'store/selectors';
import { TronActionTypes } from 'store/tron/actionTypes';
import { FullPreloader } from 'containers';
import { RequestStatus } from 'appConstants';

const TronProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const tronStatus = useShallowSelector(uiSelector.getProp(TronActionTypes.CONNECT));
  return (
    <FullPreloader
      isLoading={[
        RequestStatus.REQUEST,
        RequestStatus.INIT,
      ].includes(tronStatus)}
    >
      {children}
    </FullPreloader>
  );
};

export default TronProvider;
