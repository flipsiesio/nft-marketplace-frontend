import { fork } from 'redux-saga/effects';

import mesStLanguageSaga from './mesStLanguageSaga';
import persist from './persist';

export default function* meSaga() {
  yield fork(mesStLanguageSaga);
  yield fork(persist);
}
