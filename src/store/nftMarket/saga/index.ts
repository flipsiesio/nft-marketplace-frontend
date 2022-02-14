import { fork } from 'redux-saga/effects';
import nftMarketSignInSaga from './nftMarketSignInSaga';
import nftMarketGetProfileSaga from './nftMarketGetProfileSaga';
import nftMarketGetMarketSaga from './nftMarketGetMarketSaga';
import nftMarketGetGallerySaga from './nftMarketGetGallerySaga';
import nftMarketGetMyGallerySaga from './nftMakretGetMyGallerySaga';
import nftMarketBuyNowSaga from './nftMarketBuyNowSaga';
import nftMarketBidSaga from './nftMarketBidSaga';
import nftMarketSoldSaga from './nftMarketSoldSaga';
import nftMarketMintNowSaga from './nftMarketMintNowSaga';
import nftMarketClaimJackpotSaga from './nftMarketClaimJackpotSaga';
import nftMarketSignOutSaga from './nftMarketSignOutSaga';
import nftMarketCancelBidSaga from './nftMarketCancelBidSaga';
import nftMarketAcceptBidSaga from './nftMarketAcceptBidSaga';
import nftMarketDelistSaga from './nftMarketDelistSaga';
import nftMarketPutOnSaleSaga from './nftMarketPutOnSaleSaga';
import nftMarketApproveSaga from './nftMarketApproveSaga';
import nftMarketPutOnAuctionSaga from './nftMarketPutOnAuctionSaga';

export default function* nftMarketSaga() {
  yield fork(nftMarketSignInSaga);
  yield fork(nftMarketGetProfileSaga);
  yield fork(nftMarketGetMarketSaga);
  yield fork(nftMarketGetGallerySaga);
  yield fork(nftMarketGetMyGallerySaga);
  yield fork(nftMarketBuyNowSaga);
  yield fork(nftMarketBidSaga);
  yield fork(nftMarketSoldSaga);
  yield fork(nftMarketMintNowSaga);
  yield fork(nftMarketClaimJackpotSaga);
  yield fork(nftMarketSignOutSaga);
  yield fork(nftMarketCancelBidSaga);
  yield fork(nftMarketAcceptBidSaga);
  yield fork(nftMarketDelistSaga);
  yield fork(nftMarketPutOnSaleSaga);
  yield fork(nftMarketApproveSaga);
  yield fork(nftMarketPutOnAuctionSaga);
}
