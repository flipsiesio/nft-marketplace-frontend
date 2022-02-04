import { ReferralActionTypes } from './actionTypes';

export const referralGetStatsAction = () => ({
  type: ReferralActionTypes.GET_STATS,
});

export const referralCreateLinkAction = (payload: string) => ({
  type: ReferralActionTypes.CREATE_LINK,
  payload,
});

export const referralGetLinkAction = () => ({
  type: ReferralActionTypes.GET_LINK,
});

export const referralJoinByAction = (payload: {
  code: string,
  parentAddress: string,
}) => ({
  type: ReferralActionTypes.JOIN_BY,
  payload,
});

export const referralWithdrawAction = () => ({
  type: ReferralActionTypes.WITHDRAW,
});
