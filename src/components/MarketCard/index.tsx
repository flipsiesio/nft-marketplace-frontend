import React, { FC } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'components';
import styles from './styles.module.scss';
import { Text } from '../Typography';

type Props = {
  id: number
  img: string
  type: string
  price: string
  className?: string
  link: string
  onClick?: () => void
};

const MarketCard: FC<Props> = ({
  id,
  img,
  type,
  price,
  className,
  link,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <Link onClick={onClick} to={link} className={cx(styles.wrap, className)}>
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
    </Link>
  );
};

export { MarketCard };
