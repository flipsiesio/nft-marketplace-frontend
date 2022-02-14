import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, Text, Button,
} from 'components';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  isLoading?: boolean,
  title?: string
  isOpen?: boolean
  onToggle: () => void
  onSubmit: () => void
  price?: string
  id?: number
};

const MarketNftInteractionModal: FC<Props> = ({
  isLoading,
  isOpen = false,
  onSubmit,
  onToggle,
  title,
  id,
  price,
}) => {
  const { t } = useTranslation();

  return (
    <Modal classNameContent={styles.wrap} isOpen={isOpen} onClose={onToggle}>
      <Text className={styles.title}>{title}</Text>
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
            <Text className={cx(styles.primary, styles.bold)} tag="span">TRX</Text>
          </Text>
        </div>
      </div>
      <Button className={styles.button} onClick={onSubmit} disabled={isLoading}>
        {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
      </Button>
    </Modal>
  );
};

export { MarketNftInteractionModal };
