import { State } from 'types/store';

export const adminSelectors = {
  getProp: <PropKey extends keyof State['admin']>(propKey: PropKey) => (
    state: State,
  ) => state.admin[propKey],
  getStatus: <T extends keyof State['admin']['ui']>(propKey: T) => (state: State) => state.admin.ui[propKey],
};
