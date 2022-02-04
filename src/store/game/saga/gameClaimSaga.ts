import {
  put,
  takeEvery,
  call,
  select,
} from 'redux-saga/effects';
import { gameClaimAction, gameSetStateAction } from 'store/game/actions';
import apiActions from 'store/api/actions';
import { gameSelector, tronSelector } from 'store/selectors';
import { getTronContract } from 'utils';
import { toast } from 'react-toastify';
import { GameActionTypes } from 'store/game/actionTypes';

export function* addRequestIdToClaimLoading(requestId: string) {
  const existedClaimLoading: string[] = yield select(gameSelector.getProp('claimLoading'));
  if (!existedClaimLoading.includes(requestId)) {
    yield put(gameSetStateAction({
      claimLoading: [...existedClaimLoading, requestId],
    }));
  }
}

export function* removeRequestIdFromClaimLoading(requestId: string) {
  const existedClaimLoading: string[] = yield select(gameSelector.getProp('claimLoading'));
  const claimLoading = existedClaimLoading.filter((el) => el !== requestId);

  yield put(gameSetStateAction({
    claimLoading,
  }));
}

function* claim(requestId: string) {
  const contract = yield getTronContract(process.env.REACT_APP_CONTRACT_POKER_ADDRESS as string);
  const from: string = yield select(tronSelector.getProp('address'));

  return yield contract.claimWinAmount(requestId).send({
    from,
    feeLimit: 1_000_000_000,
  });
}

function* gameClaimSaga({ type, payload }: ReturnType<typeof gameClaimAction>) {
  try {
    yield put(apiActions.request(type));
    yield addRequestIdToClaimLoading(payload);
    yield call(claim, payload);
  } catch (err) {
    toast.error(err.message);
    yield removeRequestIdFromClaimLoading(payload);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeEvery(GameActionTypes.CLAIM, gameClaimSaga);
}
