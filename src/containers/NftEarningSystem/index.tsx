import React, { FC, useCallback, useEffect } from 'react';
import { content2 } from './content';
import { NftEarningPoints } from './NftEarningPoints';
import { Preview } from './Preview';
import styles from './styles.module.scss';

const NftEarningSystem: FC = () => {
  const handleClickPlay = useCallback(() => {
    console.log('Click play');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.system__container}>
      <Preview
        classNameContainer={styles.system__preview_container}
        onClickPlay={handleClickPlay}
      />
      <NftEarningPoints
        titleClassName={styles.system__card_title}
        content={content2}
      />
    </div>
  );
};

export { NftEarningSystem };
