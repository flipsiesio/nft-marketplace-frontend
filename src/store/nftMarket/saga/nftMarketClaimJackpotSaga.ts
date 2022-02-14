import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse, NftDto } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketClaimJackpotAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { tronSelector } from '../../selectors';

// TODO get permission and amount of nft to claim
function* nftMarketClaimJackpotSaga(
  { type, callback }: ReturnType<typeof nftMarketClaimJackpotAction>,
) {
  try {
    yield put(apiActions.request(type));
    const address: string = yield select(tronSelector.getProp('address'));
    const res: ApiResponse<NftDto[]> = yield call(marketApiSaga, {
      method: 'post',
      url: marketURL.MARKETPLACE.CLAIM_JACKPOT,
      data: {
        userAddress: address,
      },
    });
    /* const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_CARD_RANDOM_MINTER as string);
    yield contract.mintRandomFree().send({
      address,
    }); */
    yield put(apiActions.success(type, res.data));
    callback();
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.CLAIM_JACKPOT, nftMarketClaimJackpotSaga);
}
