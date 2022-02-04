import type { State, UIState } from 'types';

export default {
  getProp: <T extends keyof UIState>(propKey: T) => (state: State) => state.ui[propKey],
};
