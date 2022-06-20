export default {
  USER: {
    CREATE: '/v1/address',
    REFERRAL_CODE: (address: string) => `/v1/address/${address}/referral-code`,
    CREATE_LINK: (address: string) => `/v1/address/${address}/referral`,
    CONFIRM_EMAIL: (confirmationCode: string) => `/v1/address/email-confirmation/${confirmationCode}`,
    POKER_BETS_HISTORY: '/v1/game',
  },
};

export const marketURL = {
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    CHECK_SIGN: '/auth/check-sign',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
  },
  MARKETPLACE: {
    MARKET_LIST: '/marketplace/offer-list',
    GALLERY_LIST: '/marketplace/sale-list',
    PERSONAL_LIST: '/marketplace/personal-list',
    MINT_NOW: '/marketplace/mint-now',
    CLAIM_JACKPOT: '/marketplace/claim-jackpot-card',
    SOLD: (address: string) => `/marketplace/nft/sold/${address}`,
    OFFER: (address: string) => `/marketplace/nft/offer/${address}`,
    CARD: '/marketplace/cards',
    CARD_SVG: '/cards/svg',
    GET_BID_HISTORY: '/marketplace/getBidHistory',
    GET_TRADE_HISTORY: '/marketplace/getTradeHistory',
    GET_BID_HISTORY_COUNT: '/marketplace/getBidHistoryCount',
    GET_TRADE_HISTORY_COUNT: '/marketplace/getTradeHistoryCount',
  },
};

export const flipsiesGameUrl = `${process.env.REACT_APP_URL}game`;
