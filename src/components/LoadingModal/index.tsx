import React, { FC } from 'react';
import RModal from 'react-modal';
import cx from 'classnames';
import { Icon, Text } from 'components';
import styles from './styles.module.scss';

type Props = {
  isLoading: boolean,
  title?: string,
  className?: string,
};

const LoadingModal: FC<Props> = ({
  isLoading,
  title,
  className,
}) => (
  <RModal
    isOpen={isLoading}
    shouldCloseOnEsc={false}
    shouldCloseOnOverlayClick={false}
    className={cx(styles.modal, className)}
    overlayClassName={styles.overlay}
    onAfterOpen={() => {
      document.body.classList.add('overflow');
    }}
    onAfterClose={() => {
      document.body.classList.remove('overflow');
    }}
    ariaHideApp={false}
  >
    <div className={styles.content}>
      <Icon icon="hourglass" className={styles.icon} />
      <Text size="big" align="center" className={styles.title}>{title}</Text>
      <Text size="big" align="center">Please wait...</Text>
    </div>
  </RModal>
);

export default LoadingModal;
