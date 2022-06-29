import { CardDataForList, NftDto } from '../api';

export type NftMarketState = {
  isAuth: boolean
  market: CardDataForList[]
  gallery: CardDataForList[]
  myGallery: CardDataForList[]
  myBids: CardDataForList[]
  accessToken?: string
  refreshToken?: string
  selectedNft?: NftDto
  signedMsg?: string
};
