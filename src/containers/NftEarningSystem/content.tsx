import React, { FC } from 'react';
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

const StakingDescription: FC = () => {
  const { t } = useTranslation();

  return (
    <ul className={styles.info__point_list}>
      <li>{t('nftSystemEarn.stacking.description1')}</li>
      <li>{t('nftSystemEarn.stacking.description2')}</li>
      <li>{t('nftSystemEarn.stacking.description3')}</li>
      <li>
        <p>{t('nftSystemEarn.stacking.description4')}</p>
        <p>{t('nftSystemEarn.stacking.description5')}</p>
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
    description: <StakingDescription />,
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
