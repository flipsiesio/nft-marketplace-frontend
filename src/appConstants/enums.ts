export enum LocaleKey {
  es = 'es',
  en = 'en',
  fr = 'fr',
  ja = 'ja',
  pt = 'pt',
  zh = 'zh',
  ko = 'ko',
  'zh-hk' = 'zh_hk',
  de = 'de',
  ru = 'ru',
  hi = 'hi',
  pan = 'pan',
}

export enum RequestStatus {
  INIT = 'INIT',
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  RESET = 'RESET',
}

export enum TronStatus {
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  ADDRESS_SELECTED = 'ADDRESS_SELECTED',
}

export enum GameType {
  WIN = 'win',
  LOST = 'lost',
  DRAW = 'draw',
  JACKPOT = 'jackpot',
}

export enum GameSelectedColor {
  RED = 'red',
  BLACK = 'black',
}

export enum WSType {
  RESULT = 'result',
  ERROR = 'error',
  CLAIMED = 'emitClaimed',
}

export enum TokenOptions {
  COLORIZED_OPTION = 0,
  CARDS_WITH_EGGS_OPTION = 1,
  CARDS_WITH_TEARS_OPTION = 2,
  JOKERS_OPTION = 3,
  RARE_OPTION = 4,
}
