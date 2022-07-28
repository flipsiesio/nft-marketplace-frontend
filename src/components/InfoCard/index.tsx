import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

interface InfoCardProps {
  classNameContainer?: string,
  titleClassName?: string,
  title?: string,
  beforeTitle?: string,
  description: string | ReactNode,

}
const InfoCard:FC<InfoCardProps> = ({
  classNameContainer, titleClassName, title, beforeTitle, description,
}) => {
  return (
    <div className={cx(styles.info_card__container, classNameContainer)}>
      {beforeTitle && <p className={styles.info_card__before_title}>{beforeTitle}</p>}
      {title && <h2 className={cx(styles.info_card__title, titleClassName)}>{title}</h2>}
      <div className={styles.info_card__description}>{description}</div>
    </div>
  );
};

export { InfoCard };
