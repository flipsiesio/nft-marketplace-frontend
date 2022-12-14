import { Action, NftDto, NftMarketState } from 'types';

export enum NftMarketActionTypes {
  SET_STATE = 'NFT_MARKET.SET_STATE',
  GET_MARKET_LIST = 'NFT_MARKET.GET_MARKET_LIST',
  GET_GALLERY_LIST = 'NFT_MARKET.GET_GALLERY_LIST',
  GET_MY_GALLERY_LIST = 'NFT_MARKET.GET_MY_GALLERY_LIST',
  GET_MY_BIDS_LIST = 'NFT_MARKET.GET_MY_BIDS_LIST',
  BUY_NOW = 'NFT_MARKET.BUY_NOW',
  BID = 'NFT_MARKET.BID',
  PUT_ON = 'NFT_MARKET.PUT_ON',
  MAKE_OFFER = 'NFT_MARKET.MAKE_OFFER',
  MINT_NOW = 'NFT_MARKET.MINT_NOW',
  APPROVE = 'NFT_MARKET.APPROVE',
  ACCEPT_BID = 'NFT_MARKET.ACCEPT_BID',
  Cancel_BID = 'NFT_MARKET.CANCEL_BID',
  SIGN_IN = 'NFT_MARKET.SIGN_IN',
  SIGN_OUT = 'NFT_MARKET.SIGN_OUT',
  GET_PROFILE = 'NFT_MARKET.GET_PROFILE',
  GET_BACK_FROM_SALE = 'NFT_MARKET.GET_BACK_FROM_SALE',

  SELECT_PROFILE = 'NFT_MARKET.SELECT_PROFILE'
}

export type NftMarketAction =
  Action<NftMarketActionTypes.SET_STATE, NftMarketState> |
  Action<NftMarketActionTypes.GET_MARKET_LIST> |
  Action<NftMarketActionTypes.GET_GALLERY_LIST> |
  Action<NftMarketActionTypes.GET_MY_GALLERY_LIST> |
  Action<NftMarketActionTypes.GET_MY_BIDS_LIST> |
  Action<NftMarketActionTypes.SIGN_IN> |
  Action<NftMarketActionTypes.SELECT_PROFILE, NftDto> |
  Action<NftMarketActionTypes.SIGN_OUT> |
  Action<NftMarketActionTypes.BUY_NOW>;
