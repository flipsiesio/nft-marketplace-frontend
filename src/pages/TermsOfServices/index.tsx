import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, H3, Text } from 'components';
import styles from './styles.module.scss';

const TermsOfServices = () => {
  const { t } = useTranslation();

  return (
    <>
      <Card className={styles.card}>
        <H3 className={styles.title}>{t('termsOfServices.title')}</H3>

        <Text className={styles.paragraph}>
          <b>{t('termsOfServices.flipsies')}</b> {t('termsOfServices.offers')}
        </Text>

        <Text className={styles.paragraph}>
          {t('termsOfServices.provide')}
        </Text>

        <Text className={styles.paragraph}>
          {t('termsOfServices.verify')}
        </Text>

        <Text className={styles.paragraph}>
          {t('termsOfServices.based')}
        </Text>
      </Card>
    </>
  );
};

export default TermsOfServices;
