import type { State, ReferralState } from 'types';

export default {
  getProp: <T extends keyof ReferralState>(propKey: T) => (state: State) => state.referral[propKey],
  getState: (state: State) => state.referral,
};
