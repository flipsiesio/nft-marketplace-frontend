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
      <img src={img} alt="card" />
    )}

    {secondImg && (
      <div className={styles.cards}>
        <img src={img} alt="card" />
        <img src={secondImg} alt="card" />
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
