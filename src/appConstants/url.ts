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
    MY_BIDS_LIST: '/marketplace/personalBids',
    MINT_NOW: '/marketplace/mint-now',
    CLAIM_JACKPOT: '/marketplace/claim-jackpot-card',
    SOLD: (address: string) => `/marketplace/nft/sold/${address}`,
    OFFER: (address: string) => `/marketplace/nft/offer/${address}`,
    CARD: '/marketplace/getCards',
    CARD_SVG: '/cards/svg',
    GET_BID_HISTORY: '/marketplace/getBidHistory',
    GET_SALE_HISTORY: '/marketplace/getSaleAndMintHistory',
    GET_ACTUAL_BIDS: '/marketplace/getActualOrderBids',
    GET_ACTUAL_SALE: '/marketplace/getActualOrderSale',
  },
  JACKPOT: {
    ISSUED: '/jackpot/issued',
    SET_VIEWED: '/jackpot/setViewed',
  },
};

export const flipsiesGameUrl = `${process.env.REACT_APP_URL}game`;
