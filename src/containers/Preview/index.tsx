import React, { FC } from 'react';
import cx from 'classnames';
import previewLogo from 'assets/img/previewLogo.png';
import cardsChips from 'assets/img/cardsChips.png';
import styles from './styles.module.scss';

type Props = {
  className?: string,
};

const Preview: FC<Props> = ({ className }) => {
  return (
    <section className={cx(styles.section, className)}>
      <div className={styles.previewBg}>
        <img className={styles.previewLogo} src={previewLogo} alt="Poker based app" />
        <img src={cardsChips} alt="Poker based app" />
      </div>
    </section>
  );
};

export default Preview;
