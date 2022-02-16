import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { tronSelector } from 'store/selectors';
import { meConfirmEmailAction } from 'store/me/actions';
import { referralJoinByAction } from 'store/referral/actions';
import {
  FlipsiesNft,
} from 'containers';
import { getUrlParameter } from 'utils';
import {
  QUERY_REFERRAL_CODE,
  QUERY_PARENT_ADDRESS,
  QUERY_CONFIRMATION_CODE,
  TronStatus,
} from 'appConstants';

const Main = () => {
  const dispatch = useDispatch();
  const confirmationCode = useMemo(() => getUrlParameter(QUERY_CONFIRMATION_CODE), []);
  const referralCode = useMemo(() => getUrlParameter(QUERY_REFERRAL_CODE), []);
  const parentAddress = useMemo(() => getUrlParameter(QUERY_PARENT_ADDRESS), []);
  const tronStatus = useShallowSelector(tronSelector.getProp('status'));

  const joinByReferral = useCallback(() => {
    if (referralCode && parentAddress && (tronStatus === TronStatus.ADDRESS_SELECTED)) {
      dispatch(referralJoinByAction({
        code: referralCode,
        parentAddress,
      }));
    }
  }, [referralCode, parentAddress, tronStatus]);

  const sendConfirmationCode = useCallback(() => {
    if (confirmationCode) {
      dispatch(meConfirmEmailAction(confirmationCode));
    }
  }, [confirmationCode]);

  useEffect(() => {
    joinByReferral();
  }, [
    referralCode,
    parentAddress,
    confirmationCode,
    tronStatus,
  ]);

  useEffect(() => {
    sendConfirmationCode();
  }, [confirmationCode]);

  return (
    <FlipsiesNft />
  );
};

export default Main;
