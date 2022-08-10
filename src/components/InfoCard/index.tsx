import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const descriptionTranslate = typeof description === 'string' ? t(description) : description;
  return (
    <div className={cx(styles.info_card__container, classNameContainer)}>
      {beforeTitle && <p className={styles.info_card__before_title}>{t(beforeTitle)}</p>}
      {title && <h2 className={cx(styles.info_card__title, titleClassName)}>{t(title)}</h2>}
      <div className={styles.info_card__description}>{descriptionTranslate}</div>
    </div>
  );
};

export { InfoCard };
