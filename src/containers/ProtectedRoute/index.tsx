/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector, tronSelector } from 'store/selectors';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { routes, TronStatus } from 'appConstants';

type Props = {
  checkAccess?: boolean
} & RouteProps;

const ProtectedRoute: FC<Props> = ({
  checkAccess,
  ...rest
}) => {
  const accessToken = useShallowSelector(nftMarketSelector.getProp('accessToken'));
  const tronStatus = useShallowSelector(tronSelector.getProp('status'));

  if (checkAccess) {
    return (
      accessToken ? <Route {...rest} /> : <Redirect to={{ pathname: routes.main.root }} />
    );
  }

  return (
    tronStatus === TronStatus.ADDRESS_SELECTED ? (
      <Route
        {...rest}
      />
    ) : <Redirect to={{ pathname: routes.main.root }} />

  );
};

export default ProtectedRoute;
