import React, { FC } from 'react';
import { Text } from 'components';
import styles from './styles.module.scss';

type Props = {
  title: string
  description: string
  img: string
  secondImg?: string
};

const NftArtwork: FC<Props> = ({
  title,
  description,
  img,
  secondImg,
}) => (
  <div className={secondImg ? styles.secondCardWrap : styles.wrap}>
    {!secondImg && (
      <div className={styles.shadowWrap}>
        <div className={styles.shadow} />
        <img src={img} alt="card" className={styles.img} />
      </div>
    )}

    {secondImg && (
      <div className={styles.cards}>
        <div className={styles.shadowWrap}>
          <div className={styles.shadow} />
          <img src={img} alt="card" className={styles.img} />
        </div>
        <div className={styles.shadowWrap}>
          <div className={styles.shadow} />
          <img src={secondImg} alt="card" className={styles.img} />
        </div>
      </div>
    )}
    <Text className={styles.title}>
      {title}
    </Text>
    <Text className={styles.text}>
      {description}
    </Text>
  </div>
);

export { NftArtwork };
