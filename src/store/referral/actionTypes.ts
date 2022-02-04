import { Action, ReferralStateStats } from 'types';

export enum ReferralActionTypes {
  GET_STATS = 'REFERRAL.GET_STATS',
  GET_STATS_SUCCESS = 'REFERRAL.GET_STATS_SUCCESS',

  CREATE_LINK = 'REFERRAL.CREATE_LINK',
  CREATE_LINK_SUCCESS = 'REFERRAL.CREATE_LINK_SUCCESS',

  GET_LINK = 'REFERRAL.GET_LINK',
  GET_LINK_SUCCESS = 'REFERRAL.GET_LINK_SUCCESS',

  JOIN_BY = 'REFERRAL.JOIN_BY',
  JOIN_BY_SUCCESS = 'REFERRAL.JOIN_BY_SUCCESS',

  WITHDRAW = 'REFERRAL.WITHDRAW',
  WITHDRAW_SUCCESS = 'REFERRAL.WITHDRAW_SUCCESS',
}

export type ReferralAction =
 Action<ReferralActionTypes.GET_STATS>
 | Action<ReferralActionTypes.GET_STATS_SUCCESS, ReferralStateStats>

 | Action<ReferralActionTypes.CREATE_LINK, string>
 | Action<ReferralActionTypes.CREATE_LINK_SUCCESS, string>

 | Action<ReferralActionTypes.GET_LINK>
 | Action<ReferralActionTypes.GET_LINK_SUCCESS, string>

 | Action<ReferralActionTypes.JOIN_BY>
 | Action<ReferralActionTypes.JOIN_BY_SUCCESS>

 | Action<ReferralActionTypes.WITHDRAW>
 | Action<ReferralActionTypes.WITHDRAW_SUCCESS>;
