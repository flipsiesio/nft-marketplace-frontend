import { takeEvery } from 'redux-saga/effects';
import { RehydrateAction } from 'redux-persist';
import type { MeState } from 'types';
import i18n from 'i18next';
import { MeActionTypes } from 'store/me/actionTypes';

function* persist({ payload, key }: RehydrateAction) {
  if (key === 'me' && payload) {
    yield i18n.changeLanguage((payload as Pick<MeState, 'language'>).language);
  }
}

export default function* listener() {
  yield takeEvery(MeActionTypes.PERSIST, persist);
}
