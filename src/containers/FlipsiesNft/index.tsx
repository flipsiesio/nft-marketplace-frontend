import React, { FC, useCallback } from 'react';
import { Button, Text } from 'components';
import { useHistory } from 'react-router-dom';
import { routes } from 'appConstants';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

const FlipsiesNft: FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const clickHandler = useCallback(() => {
    history.push(routes.explore.root);
  }, [history]);

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <Text className={styles.title}>
          {t('flipsiesNft.title')}
        </Text>

        <Text className={styles.text}>
          {t('flipsiesNft.text1')}
        </Text>
        <Text className={styles.text}>
          {t('flipsiesNft.text2')}
          &nbsp;
          <Text tag="span" className={styles.green}>
            {t('flipsiesNft.text3')}
          </Text>
        </Text>
        <Text className={styles.text}>
          {t('flipsiesNft.text4')}
        </Text>
        <Text className={styles.text}>
          {t('flipsiesNft.text5')}
        </Text>
      </div>
      <Button onClick={clickHandler} className={styles.button}>
        {t('flipsiesNft.explore')}
      </Button>
    </div>
  );
};

export { FlipsiesNft };
