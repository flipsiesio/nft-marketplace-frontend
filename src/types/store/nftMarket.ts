import { CardMetadata, NftDto } from '../api';

export type NftMarketState = {
  isAuth: boolean
  market: CardMetadata[]
  gallery: CardMetadata[]
  myGallery: CardMetadata[]
  accessToken?: string
  refreshToken?: string
  selectedNft?: NftDto
  signedMsg?: string
};
