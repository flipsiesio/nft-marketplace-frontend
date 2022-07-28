import React, { FC } from 'react';
import cx from 'classnames';
import Button from 'components/Button';
import Logo from 'components/Logo';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface PreviewProps {
  classNameContainer?: string,
  imageClassName?: string,
  onClickPlay: () => void,
}
const Preview:FC<PreviewProps> = ({
  classNameContainer, imageClassName, onClickPlay,
}) => {
  const { t } = useTranslation();
  return (
    <section className={cx(styles.preview__container, classNameContainer)}>
      <Logo className={cx(styles.preview__image, imageClassName)} />
      <Button
        className={styles.preview__button}
        onClick={onClickPlay}
        use="rounded"
        size="huge"
        theme="playNow"
      >
        {t('nftSystemEarn.playNow')}
      </Button>
    </section>
  );
};

export { Preview };
