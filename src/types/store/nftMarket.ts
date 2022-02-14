import { NftDto } from '../api';

export type NftMarketState = {
  isAuth: boolean
  market: NftDto[]
  gallery: NftDto[]
  myGallery: NftDto[]
  accessToken?: string
  refreshToken?: string
  selectedNft?: NftDto
  signedMsg?: string
};
