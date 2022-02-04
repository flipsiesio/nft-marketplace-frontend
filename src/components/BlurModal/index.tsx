import React, { FC } from 'react';
import RModal from 'react-modal';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean,
  className?: string,
  classNameOverlay?: string,
  withCloseBtn?: boolean,
  parentSelector?: string,
  shouldCloseOnOverlayClick?: boolean,
  onClose?: () => void,
};

const BlurModal: FC<Props> = ({
  isOpen,
  children,
  className,
  classNameOverlay,
  parentSelector = 'body',
  shouldCloseOnOverlayClick = true,
  onClose = () => {},
}) => (
  <RModal
    shouldCloseOnEsc
    shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    isOpen={isOpen}
    className={cx(styles.modal, className)}
    overlayClassName={cx(styles.overlay, classNameOverlay)}
    ariaHideApp={false}
    parentSelector={() => document.querySelector(parentSelector) as HTMLElement}
    onRequestClose={onClose}
  >
    {children}
  </RModal>
);

export default BlurModal;
