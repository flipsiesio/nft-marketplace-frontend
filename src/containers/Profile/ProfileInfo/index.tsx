import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { referralSelector, uiSelector } from 'store/selectors';
import { referralWithdrawAction } from 'store/referral/actions';
import {
  H4,
  Text,
  Icon,
  Preloader,
  Button,
} from 'components';
import { getTrxFromSun } from 'utils';
import { TrxUsdConverter } from 'containers';
import styles from './styles.module.scss';

// eslint-disable-next-line global-require, import/no-dynamic-require
const getImgSrc = (rankName: string): string => (rankName ? require(`assets/img/ranks/${rankName}.svg`) : '');

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const referral = useSelector(referralSelector.getState);

  const [isTooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const getReferralStatsReqStatus = useSelector(uiSelector.getProp('ME_REFERRAL_GET_STATS'));
  const totalEarningsTrx = getTrxFromSun(referral.totalEarnings);

  const specifications = useMemo(() => [
    {
      id: 1,
      icon: 'peoples',
      label: t('profile.invitedPlayers'),
      value: <H4 className={styles.value}>{referral.invitedPlayers}</H4>,
    },
    {
      id: 2,
      icon: 'star',
      label: t('profile.currentRank'),
      value: (
        <div className={styles.rankWrapper}>
          <div
            className={styles.rank}
            style={{
              backgroundImage: `url('${getImgSrc(referral.rankName)}')`,
            }}
          />
          <div
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseOut={() => setTooltipVisible(false)}
            onFocus={() => setTooltipVisible(true)}
            onBlur={() => setTooltipVisible(false)}
            style={{
              cursor: 'pointer',
            }}
          >
            <H4 className={styles.value}>{referral.rankName && t(`ranks.${referral.rankName}`)}</H4>
          </div>
          <div
            style={{
              display: isTooltipVisible ? 'flex' : 'none',
            }}
            className={styles.toolTip}
          >
            <Text color="black">{`${referral.bonus}%  ${t('profile.ofHouseEdge')}`}</Text>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      icon: 'cash',
      label: t('profile.totalEarnings'),
      value: (
        <>
          <H4 color="primary" className={styles.value}>{totalEarningsTrx || 0} TRX</H4>
          <Text color="secondary" size="big" bold><TrxUsdConverter trx={+totalEarningsTrx} /></Text>
        </>
      ),
    },
  ], [referral, isTooltipVisible, t]);

  return (
    <Preloader isLoading={getReferralStatsReqStatus === 'REQUEST'}>
      <ul className={styles.list}>
        {specifications.map((specification) => (
          <li key={specification.id} className={styles.item}>
            <Icon icon={specification.icon} />
            <div>
              <Text className={styles.label}>{specification.label}</Text>
              {specification.value}
            </div>
          </li>
        ))}
        <div
          className={styles.withdraw}
        >
          <Button
            className={styles.withdrawButton}
            onClick={() => {
              dispatch(referralWithdrawAction());
            }}
          >
            {t('profile.withdraw')}
          </Button>
          <Text
            size="tiny"
            color="gray"
          >
            {t('profile.note')}
          </Text>
        </div>
      </ul>
    </Preloader>
  );
};

export default ProfileInfo;
