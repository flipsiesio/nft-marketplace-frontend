import { NftMarketState } from 'types/store';
import { NftMarketActionTypes } from './actionTypes';
import {
  AcceptBid, MarketType, NftDto, NftReqDto,
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

export const nftMarketGetMyBidsAction = (payload?: NftReqDto) => ({
  type: NftMarketActionTypes.GET_MY_BIDS_LIST,
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

export const nftMarketGetProfileAction = (id: string) => ({
  type: NftMarketActionTypes.GET_PROFILE,
  payload: {
    id,
  },
});

export const nftMarketSelectProfileAction = (payload?: NftDto) => ({
  type: NftMarketActionTypes.SELECT_PROFILE,
  payload,
});

export const nftMarketBuyNowAction = (
  callback: () => void,
) => ({
  type: NftMarketActionTypes.BUY_NOW,
  callback,
});

export const nftMarketBidAction = (
  payload: {price: string, id: number},
  successCallback: () => void,
) => ({
  type: NftMarketActionTypes.BID,
  payload,
  successCallback,
});

export const nftMarketMakeOfferAction = (payload: string) => ({
  type: NftMarketActionTypes.MAKE_OFFER,
  payload,
});

export const nftMarketMintNowAction = (payload: number, callback: (trxHash: string) => void) => ({
  type: NftMarketActionTypes.MINT_NOW,
  payload,
  callback,
});

export const nftMarketApproveAction = (payload: {
  actionType: MarketType,
  tokenId: number,
}, callback: (actionType: MarketType) => void) => ({
  type: NftMarketActionTypes.APPROVE,
  payload,
  callback,
});

export const nftMarketSignOutAction = () => ({
  type: NftMarketActionTypes.SIGN_OUT,
});

export const nftMarketAcceptBidAction = (payload: AcceptBid, callback?: () => void) => ({
  type: NftMarketActionTypes.ACCEPT_BID,
  payload,
  callback,
});

export const nftMarketCancelBidAction = (payload: {
  orderId: number
}, callback?: () => void) => ({
  type: NftMarketActionTypes.Cancel_BID,
  payload,
  callback,
});

export const nftMarketPutOnAction = (payload: {
  marketType: MarketType,
  price: number,
  nftAddress: number,
  maxDuration: number
}, callback: () => void) => ({
  type: NftMarketActionTypes.PUT_ON,
  payload,
  callback,
});

export const getBackFromSaleAction = (
  payload: {
    marketType: MarketType
    orderId: number
  },
  callback?: () => void,
) => ({
  type: NftMarketActionTypes.GET_BACK_FROM_SALE,
  payload,
  callback,
});
