import { CardDataForList, MyBidsCardData, NftDto } from '../api';

export type NftMarketState = {
  isAuth: boolean
  market: CardDataForList[]
  gallery: CardDataForList[]
  myGallery: CardDataForList[]
  myBids: MyBidsCardData[]
  accessToken?: string
  refreshToken?: string
  selectedNft: NftDto | undefined
  signedMsg?: string
};
