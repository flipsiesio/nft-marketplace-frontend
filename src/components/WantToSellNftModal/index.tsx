import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, Text, Button,
} from 'components';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  isLoading?: boolean,
  isOpen?: boolean
  onToggle: () => void
  onSubmit: () => void
  price: string
  id?: number
};

export const WantToSellNftModal: FC<Props> = ({
  isLoading,
  isOpen = false,
  onSubmit,
  onToggle,
  id,
  price,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      classNameContent={styles.wrap}
      isOpen={isOpen}
      onClose={!isLoading ? onToggle : undefined}
    >
      <Text className={styles.title}>{t('nftMarket.sellTitle')}</Text>
      <div className={styles.row}>
        <div className={styles.col}>
          <Text className={styles.text}>
            {t('nftMarket.id')}
          </Text>
          <Text className={styles.bold} tag="span">{`#${id}`}</Text>
        </div>
        <div className={styles.col}>
          <Text className={styles.text}>
            {t('nftMarket.price')}
          </Text>
          <Text className={styles.bold}>
            {price}
            &nbsp;
            <Text className={cx(styles.primary, styles.bold)} tag="span">BTTC</Text>
          </Text>
        </div>
      </div>
      <Button
        className={styles.button}
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
      </Button>
    </Modal>
  );
};
