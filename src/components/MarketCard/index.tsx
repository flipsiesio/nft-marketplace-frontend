import React, { FC, useCallback } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Text } from '../Typography';
import { NftType } from '../../types';
import { NotActiveCardIcon } from '../NotActiveCardIcon';

type Props = {
  id: number
  img: string
  type: NftType
  price: string
  className?: string
  onCardClick: (id: number) => void
  active?: boolean
};

const MarketCard: FC<Props> = ({
  id,
  img,
  type,
  price,
  className,
  onCardClick,
  active,
}) => {
  const { t } = useTranslation();

  const onClick = useCallback(() => {
    onCardClick(id);
  }, []);

  return (
    <div onClick={onClick} className={cx(styles.wrap, className)}>
      <Text className={styles.title}>
        {t('nftMarket.id')}
        &nbsp;
        <Text className={styles.bold} tag="span">{`#${id}`}</Text>
      </Text>
      <NotActiveCardIcon active={active} url={img} className={styles.img} />
      <div className={styles.info}>
        <div className={styles.infoBlock}>
          <Text className={styles.infoBlockLabel}>Type</Text>
          <Text className={styles.infoBlockValue}>{type}</Text>
        </div>
        <div className={styles.infoBlock}>
          <Text className={styles.infoBlockLabel}>Price</Text>
          <div className={styles.price}>
            <Text className={styles.infoBlockValue}>{`${price}`}</Text>
            <Text className={cx(styles.primary, styles.trx)} tag="span">TRX</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MarketCard };
