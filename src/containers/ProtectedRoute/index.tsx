/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector, walletSelectors } from 'store/selectors';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { routes } from 'appConstants';
import { WalletStatus } from '../../store/wallet/types';

type Props = {
  checkAccess?: boolean
} & RouteProps;

const ProtectedRoute: FC<Props> = ({
  checkAccess,
  ...rest
}) => {
  const accessToken = useShallowSelector(nftMarketSelector.getProp('accessToken'));
  const status = useShallowSelector(walletSelectors.getProp('status'));

  if (checkAccess) {
    return (
      accessToken ? <Route {...rest} /> : <Redirect to={{ pathname: routes.main.root }} />
    );
  }

  return (
    status === WalletStatus.CONNECTED ? (
      <Route
        {...rest}
      />
    ) : <Redirect to={{ pathname: routes.main.root }} />

  );
};

export default ProtectedRoute;
