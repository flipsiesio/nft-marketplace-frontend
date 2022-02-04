import type { State, TronState } from 'types';

export default {
  getProp: <T extends keyof TronState>(propKey: T) => (state: State) => state.tron[propKey],
  getState: (state: State) => state.tron,
};
