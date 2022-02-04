import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { tronSelector } from 'store/selectors';
import { meConfirmEmailAction } from 'store/me/actions';
import { referralJoinByAction } from 'store/referral/actions';
import {
  FlipsiesNft,
  Preview,
} from 'containers';
import { getUrlParameter } from 'utils';
import {
  QUERY_REFERRAL_CODE,
  QUERY_PARENT_ADDRESS,
  QUERY_CONFIRMATION_CODE,
  TronStatus,
} from 'appConstants';
import { Icon } from 'components';
import SwiperCore, {
  Navigation,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { NavigationOptions } from 'swiper/types/modules/navigation';
import cx from 'classnames';
import styles from './styles.module.scss';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';

SwiperCore.use([Navigation]);

const navigation: NavigationOptions = {
  prevEl: '.prev-btn',
  nextEl: '.next-btn',
  disabledClass: styles.disabledButton,
};

const Main = () => {
  const dispatch = useDispatch();
  const confirmationCode = useMemo(() => getUrlParameter(QUERY_CONFIRMATION_CODE), []);
  const referralCode = useMemo(() => getUrlParameter(QUERY_REFERRAL_CODE), []);
  const parentAddress = useMemo(() => getUrlParameter(QUERY_PARENT_ADDRESS), []);
  const tronStatus = useShallowSelector(tronSelector.getProp('status'));

  const joinByReferral = useCallback(() => {
    if (referralCode && parentAddress && (tronStatus === TronStatus.ADDRESS_SELECTED)) {
      dispatch(referralJoinByAction({
        code: referralCode,
        parentAddress,
      }));
    }
  }, [referralCode, parentAddress, tronStatus]);

  const sendConfirmationCode = useCallback(() => {
    if (confirmationCode) {
      dispatch(meConfirmEmailAction(confirmationCode));
    }
  }, [confirmationCode]);

  useEffect(() => {
    joinByReferral();
  }, [
    referralCode,
    parentAddress,
    confirmationCode,
    tronStatus,
  ]);

  useEffect(() => {
    sendConfirmationCode();
  }, [confirmationCode]);

  return (
    <Swiper navigation={navigation}>
      <button type="button" className={cx('prev-btn', styles.prevButton, styles.navButton)}>
        <Icon icon="chevron" />
      </button>
      <button type="button" className={cx('next-btn', styles.nextButton, styles.navButton)}>
        <Icon icon="chevron" />
      </button>

      <SwiperSlide>
        <Preview className={styles.preview} />
      </SwiperSlide>
      <SwiperSlide>
        <FlipsiesNft />
      </SwiperSlide>
    </Swiper>
  );
};

export default Main;
