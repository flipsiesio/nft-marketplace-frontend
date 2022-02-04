import { fork } from 'redux-saga/effects';

import meConfirmEmailSaga from './meConfirmEmailSaga';
import mesStLanguageSaga from './mesStLanguageSaga';
import persist from './persist';

export default function* meSaga() {
  yield fork(meConfirmEmailSaga);
  yield fork(mesStLanguageSaga);
  yield fork(persist);
}
