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
    MARKET_LIST: '/marketplace/sale-list',
    GALLERY_LIST: '/marketplace/offer-list',
    PERSONAL_LIST: '/marketplace/presonal-list',
    MINT_NOW: '/marketplace/mint-now',
    CLAIM_JACKPOT: '/marketplace/claim-jackpot-card',
    BUY_NOW: (address: string) => `/marketplace/nft/buy-now/${address}`,
    BUY_OFFER: (address: string) => `/marketplace/nft/buy-offer/${address}`,
    SOLD: (address: string) => `/marketplace/nft/sold/${address}`,
    OFFER: (address: string) => `/marketplace/nft/offer/${address}`,
    CARD: '/cards/get',
    CARD_SVG: '/cards/svg',
  },
};

export const flipsiesGameUrl = `${process.env.REACT_APP_URL}game`;
