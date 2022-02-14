import { NftMarketState } from 'types/store';
import { NftMarketActionTypes } from './actionTypes';
import {
  AcceptBid, NftDto, NftReqDto, SoldReq,
} from '../../types';

export const nftMarketSetStateAction = (payload: Partial<NftMarketState>) => ({
  type: NftMarketActionTypes.SET_STATE,
  payload,
});

export const nftMarketGetMarketAction = (payload?: NftReqDto) => ({
  type: NftMarketActionTypes.GET_MARKET_LIST,
  payload,
});

export const nftMarketGetGalleryAction = (payload?: NftReqDto) => ({
  type: NftMarketActionTypes.GET_GALLERY_LIST,
  payload,
});

export const nftMarketGetMyGalleryAction = (payload?: NftReqDto) => ({
  type: NftMarketActionTypes.GET_MY_GALLERY_LIST,
  payload,
});

export const nftMarketSignInAction = (callback?: () => void) => ({
  type: NftMarketActionTypes.SIGN_IN,
  callback,
});

export const nftMarketGetProfileAction = () => ({
  type: NftMarketActionTypes.GET_PROFILE,
});

export const nftMarketSelectProfileAction = (payload?: NftDto) => ({
  type: NftMarketActionTypes.SELECT_PROFILE,
  payload,
});

export const nftMarketBuyNowAction = (payload: string, callback: () => void) => ({
  type: NftMarketActionTypes.BUY_NOW,
  payload,
  callback,
});

export const nftMarketBidAction = (payload: string) => ({
  type: NftMarketActionTypes.BID,
  payload,
});

export const nftMarketCancelBidAction = () => ({
  type: NftMarketActionTypes.CANCEL_BID,
});

export const nftMarketMakeOfferAction = (payload: string) => ({
  type: NftMarketActionTypes.MAKE_OFFER,
  payload,
});

export const nftMarketSoldAction = (payload: SoldReq) => ({
  type: NftMarketActionTypes.SOLD,
  payload,
});

export const nftMarketMintNowAction = (payload: number, callback: () => void) => ({
  type: NftMarketActionTypes.MINT_NOW,
  payload,
  callback,
});

export const nftMarketClaimJackpotAction = (callback: () => void) => ({
  type: NftMarketActionTypes.CLAIM_JACKPOT,
  callback,
});

export const nftMarketSignOutAction = () => ({
  type: NftMarketActionTypes.SIGN_OUT,
});

export const nftMarketAcceptBidAction = (payload: AcceptBid) => ({
  type: NftMarketActionTypes.ACCEPT_BID,
  payload,
});

export const nftMarketDelistAction = (payload: number, callback: () => void) => ({
  type: NftMarketActionTypes.DELIST,
  payload,
  callback,
});

export const nftMarketPutOnSaleAction = (payload: {
  price: number,
  nftAddress: number,
}, callback: () => void) => ({
  type: NftMarketActionTypes.PUT_ON_SALE,
  payload,
  callback,
});
