import { takeLeading } from 'redux-saga/effects';
import i18n from 'i18next';
import { MeActionTypes } from 'store/me/actionTypes';
import { meSetLangAction } from 'store/me/actions';

function* mesStLanguageSaga({ payload }: ReturnType<typeof meSetLangAction>) {
  if (payload) yield i18n.changeLanguage(payload);
}

export default function* listener() {
  yield takeLeading(MeActionTypes.SET_LANG, mesStLanguageSaga);
}
