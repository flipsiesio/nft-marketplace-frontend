import { put, select } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import { authApi } from 'store/api';
import {
  RequestStatus,
} from 'types';
import { marketURL } from 'appConstants';
import {
  adminSetStatus, adminDownloadCsv,
} from 'store/admin/actionCreators';
import { nftMarketSelector } from 'store/selectors';

export function* adminDownloadCsvSaga({ type, payload }: ReturnType<typeof adminDownloadCsv>) {
  try{
    yield put(adminSetStatus({ type, status: RequestStatus.REQUEST }));

    const accessToken: string = yield select(nftMarketSelector.getProp('accessToken'));

    authApi.defaults.headers.Authorization = `Bearer ${accessToken}`;

    yield authApi({
      method: 'get',
      url: marketURL.AUTH.ADMIN_STATISTICS,
      params: {
        startDate: payload.startDate,
        endDate: payload.endDate,
      },
    });

    yield put(adminSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(adminSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
