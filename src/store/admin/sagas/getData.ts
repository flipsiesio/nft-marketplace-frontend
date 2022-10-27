import { put } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  RequestStatus,
} from 'types';
import {
  adminSetStatus, adminGetData,
} from 'store/admin/actionCreators';

export function* adminGetDataSaga({ type }: ReturnType<typeof adminGetData>) {
  try{
    yield put(adminSetStatus({ type, status: RequestStatus.REQUEST }));

    yield put(adminSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(adminSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
