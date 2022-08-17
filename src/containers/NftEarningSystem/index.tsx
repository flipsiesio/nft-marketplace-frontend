import React, { FC, useEffect } from 'react';
import { content2 } from './content';
import { NftEarningPoints } from './NftEarningPoints';
import styles from './styles.module.scss';

const NftEarningSystem: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.system__container}>
      <NftEarningPoints
        titleClassName={styles.system__card_title}
        content={content2}
      />
    </div>
  );
};

export { NftEarningSystem };
