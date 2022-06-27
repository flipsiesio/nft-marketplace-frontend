import { fork } from 'redux-saga/effects';
import nftMarketSignInSaga from './nftMarketSignInSaga';
import nftMarketGetProfileSaga from './nftMarketGetProfileSaga';
import nftMarketGetMarketSaga from './nftMarketGetMarketSaga';
import nftMarketGetGallerySaga from './nftMarketGetGallerySaga';
import nftMarketGetMyGallerySaga from './nftMarketGetMyGallerySaga';
import nftMarketBuyNowSaga from './nftMarketBuyNowSaga';
import nftMarketBidSaga from './nftMarketBidSaga';
import nftMarketMintNowSaga from './nftMarketMintNowSaga';
import nftMarketClaimJackpotSaga from './nftMarketClaimJackpotSaga';
import nftMarketSignOutSaga from './nftMarketSignOutSaga';
import nftMarketAcceptBidSaga from './nftMarketAcceptBidSaga';
import nftMarketDelistSaga from './nftMarketDelistSaga';
import nftMarketApproveSaga from './nftMarketApproveSaga';
import nftMarketPutOnAuctionSaga from './nftMarketPutOnSaga';
import nftMarketGetMyBidsSaga from './nftMarketGetMyBidsSaga';
import nftMarketGetBackFromSaleSaga from './nftMarketGetBackFromSaleSaga';

export default function* nftMarketSaga() {
  yield fork(nftMarketSignInSaga);
  yield fork(nftMarketGetProfileSaga);
  yield fork(nftMarketGetMarketSaga);
  yield fork(nftMarketGetGallerySaga);
  yield fork(nftMarketGetMyGallerySaga);
  yield fork(nftMarketBuyNowSaga);
  yield fork(nftMarketBidSaga);
  yield fork(nftMarketMintNowSaga);
  yield fork(nftMarketClaimJackpotSaga);
  yield fork(nftMarketSignOutSaga);
  yield fork(nftMarketAcceptBidSaga);
  yield fork(nftMarketDelistSaga);
  yield fork(nftMarketApproveSaga);
  yield fork(nftMarketPutOnAuctionSaga);
  yield fork(nftMarketGetMyBidsSaga);
  yield fork(nftMarketGetBackFromSaleSaga);
}
