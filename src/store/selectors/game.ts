import type { State, GameState } from 'types';

export default {
  getProp: <T extends keyof GameState>(propKey: T) => (state: State) => state.game[propKey],
  getState: (state: State) => state.game,
};
