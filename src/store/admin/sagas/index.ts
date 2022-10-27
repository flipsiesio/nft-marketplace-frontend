import { takeLeading } from 'redux-saga/effects';
import { AdminActionTypes } from '../actionsTypes';
import { adminGetDataSaga } from './getData';
import { adminDownloadCsvSaga } from './download';

export default function* adminSaga() {
  yield takeLeading(AdminActionTypes.GetData, adminGetDataSaga);
  yield takeLeading(AdminActionTypes.DownloadCsv, adminDownloadCsvSaga);
}
