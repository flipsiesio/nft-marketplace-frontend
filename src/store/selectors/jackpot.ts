import type { State, JackpotState } from 'types';

export default {
  getProp: <T extends keyof JackpotState>(propKey: T) => (state: State) => state.jackpot[propKey],
  getState: (state: State) => state.jackpot,
};
