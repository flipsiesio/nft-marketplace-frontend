import type { BetsHistoryState, State } from 'types';

export default {
  getProp: <T extends keyof BetsHistoryState>
  (propKey: T) => (state: State) => state.betsHistory[propKey],
  getState: (state: State) => state.betsHistory,
};
