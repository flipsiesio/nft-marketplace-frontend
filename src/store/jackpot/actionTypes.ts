import type {
  Action,
  Game,
} from 'types';

export enum JackpotActionTypes {
  GET_DATA = 'JACKPOT.GET_DATA',
  GET_DATA_SUCCESS = 'JACKPOT.GET_DATA_SUCCESS',

  GET_VALUE = 'JACKPOT.GET_VALUE',
  GET_VALUE_SUCCESS = 'JACKPOT.GET_VALUE_SUCCESS',
}
export type JackpotAction =
  Action<JackpotActionTypes.GET_DATA>
  | Action<JackpotActionTypes.GET_DATA_SUCCESS, Game[]>

  | Action<JackpotActionTypes.GET_VALUE>
  | Action<JackpotActionTypes.GET_VALUE_SUCCESS, number>;
