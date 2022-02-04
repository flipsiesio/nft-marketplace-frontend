import { NftDto, NftRes } from '../api';

export type NftMarketState = {
  isAuth: boolean
  market: NftRes[]
  gallery: NftRes[]
  myGallery: NftRes[]
  accessToken?: string
  refreshToken?: string
  selectedNft?: NftDto
  signedMsg?: string
};
