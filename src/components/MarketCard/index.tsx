import React, { FC, useCallback } from 'react';
import cx from 'classnames';
import { NftDto } from 'types';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Text } from '../Typography';

type Props = {
  item: NftDto,
  id: number
  img: string
  type: string
  price: string
  className?: string
  onCardClick: (selectedItem: NftDto) => void
};

const MarketCard: FC<Props> = ({
  item,
  id,
  img,
  type,
  price,
  className,
  onCardClick,
}) => {
  const { t } = useTranslation();

  const onClick = useCallback(() => {
    onCardClick(item);
  }, []);

  return (
    <div onClick={onClick} className={cx(styles.wrap, className)}>
      <Text className={styles.title}>
        {t('nftMarket.id')}
        &nbsp;
        <Text className={styles.bold} tag="span">{`#${id}`}</Text>
      </Text>
      <img src={img} alt="" />
      <div className={styles.info}>
        <div className={styles.infoBlock}>
          <Text className={styles.infoBlockLabel}>Type</Text>
          <Text className={styles.infoBlockValue}>{type}</Text>
        </div>
        <div className={styles.infoBlock}>
          <Text className={styles.infoBlockLabel}>Price</Text>
          <Text className={styles.infoBlockValue}>
            {`${price}`}
            &nbsp;
            <Text className={styles.primary} tag="span">TRX</Text>
          </Text>
        </div>
      </div>
    </div>
  );
};

export { MarketCard };
