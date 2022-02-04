import type { State, MeState } from 'types';

export default {
  getProp: <T extends keyof MeState>(propKey: T) => (state: State) => state.me[propKey],
  getState: (state: State) => state.me,
};
