import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

const FormuleDescription1 = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.info__point_container}>
      <p className={styles.info__about}>{t('nftSystemEarn.formula.description1')}</p>
      <p className={styles.info__point}><span className={styles.info__char}>T : </span>
        {t('nftSystemEarn.formula.description2')}
      </p>
      <p className={styles.info__point}><span className={styles.info__char}>B : </span>
        {t('nftSystemEarn.formula.description3')}
      </p>
      <p className={styles.info__point}><span className={styles.info__char}>R : </span>
        {t('nftSystemEarn.formula.description4')}
      </p>
    </div>
  );
};

const FormuleDescription2 = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.info__point_container}>
      <p className={styles.info__about}>{t('nftSystemEarn.formula.description5')}</p>
      <p className={styles.info__point}><span className={styles.info__char}>T : </span>
        {t('nftSystemEarn.formula.description6')}
      </p>
      <p className={styles.info__point}><span className={styles.info__char}>B : </span>
        {t('nftSystemEarn.formula.description7')}
      </p>
      <p className={styles.info__point}><span className={styles.info__char}>R : </span>
        {t('nftSystemEarn.formula.description8')}
      </p>
    </div>
  );
};

const BuybackList1 = () => {
  const { t } = useTranslation();

  return (
    <ul className={styles.info__point_list_buyback}>
      <li>{t('nftSystemEarn.buyback.description1')}</li>
      <li>{t('nftSystemEarn.buyback.description2')}</li>
    </ul>
  );
};

const StackingList = () => {
  const { t } = useTranslation();

  return (
    <ul className={styles.info__point_list}>
      <li>{t('nftSystemEarn.stacking.description1')}</li>
      <li>{t('nftSystemEarn.stacking.description2')}</li>
      <li>{t('nftSystemEarn.stacking.description3')}
      </li>
      <li>{t('nftSystemEarn.stacking.description4')}</li>
      <li>{t('nftSystemEarn.stacking.description5')}
      </li>
      <li>{t('nftSystemEarn.stacking.description6')}</li>
    </ul>
  );
};

export const content2 = [
  {
    beforeTitle: '',
    title: 'nftSystemEarn.buyback.title',
    description: 'nftSystemEarn.buyback.description',
  },
  {
    beforeTitle: '',
    title: 'nftSystemEarn.stacking.title',
    description: 'nftSystemEarn.stacking.description',
  },
  {
    beforeTitle: '',
    title: '',
    description: 'nftSystemEarn.allTokens.description',
  },
  {
    beforeTitle: 'nftSystemEarn.formula.beforeTitle',
    title: 'nftSystemEarn.formula.title',
    description: <FormuleDescription1 />,
  },

];

export const content1 = [
  {
    beforeTitle: '',
    title: 'nftSystemEarn.buyback.title',
    description: <BuybackList1 />,
  },
  {
    beforeTitle: '',
    title: 'nftSystemEarn.stacking.title',
    description: <StackingList />,
  },
  {
    beforeTitle: '',
    title: '',
    description: 'nftSystemEarn.allTokens.description1',
  },
  {
    beforeTitle: 'Here is the formula for total rate calculation for one group:',
    title: '(CurrentTimeRate + (T * B)  ) + R',
    description: <FormuleDescription2 />,
  },

];
