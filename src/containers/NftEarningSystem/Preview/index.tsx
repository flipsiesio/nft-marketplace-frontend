import React, { FC } from 'react';
import cx from 'classnames';
import Button from 'components/Button';
import Logo from 'components/Logo';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { useShallowSelector } from '../../../hooks';
import { tronSelector } from '../../../store/selectors';
import { TronStatus } from '../../../appConstants';
import { Text } from '../../../components';

interface PreviewProps {
  classNameContainer?: string,
  imageClassName?: string,
  onClickPlay: () => void,
}
const Preview:FC<PreviewProps> = ({
  classNameContainer, imageClassName, onClickPlay,
}) => {
  const status = useShallowSelector(tronSelector.getProp('status'));
  const { t } = useTranslation();
  return (
    <section className={cx(styles.preview__container, classNameContainer)}>
      <div className={styles.preview__image_wrapper}>
        <Logo view="preview" className={cx(styles.preview__image, imageClassName)} />
      </div>
      <Button
        className={styles.preview__button}
        onClick={onClickPlay}
        use="rounded"
        size="huge"
        theme="play"
      >
        {t('nftSystemEarn.playNow')}
      </Button>
      {status !== TronStatus.ADDRESS_SELECTED && (
        <Text className={styles.preview__login_label}>
          Please
          &nbsp;
          <button className={styles.preview__button_login} type="button">sign in</button>
          &nbsp;
          to TronLink and connect wallet to play
        </Text>
      )}
    </section>
  );
};

export { Preview };
