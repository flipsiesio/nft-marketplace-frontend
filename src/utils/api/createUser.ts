import { call } from 'redux-saga/effects';
import api from 'store/api';
import { URL } from 'appConstants';

type Params = {
  address: string,
  referralCode?: string,
};

export default function* createUser({ address, referralCode }: Params) {
  yield call(api, {
    method: 'post',
    url: URL.USER.CREATE,
    data: {
      address,
      parentRef: referralCode,
    },
  });
}
