import React, { FC, ReactNode } from 'react';
import { InfoCard } from 'components';
import cx from 'classnames';
import styles from './styles.module.scss';

export interface IContentPoints {
  beforeTitle: string,
  title: string,
  description: string | ReactNode
}

interface NftEarningPointsProps {
  classNameContainer?: string,
  infoCardContainerClassName?: string,
  titleClassName?: string,
  content: IContentPoints[],
}
const NftEarningPoints: FC<NftEarningPointsProps> = ({
  classNameContainer,
  infoCardContainerClassName,
  titleClassName,
  content,
}) => {
  return (
    <section className={styles.points__outer_container}>
      <div className={cx(styles.points__container, classNameContainer)}>
        {content.map((point) => (
          <InfoCard
            key={`${point.title}${point.beforeTitle}`}
            classNameContainer={cx(styles.points__card_container, infoCardContainerClassName)}
            titleClassName={cx(styles.points__card_title, titleClassName)}
            beforeTitle={point.beforeTitle}
            title={point.title}
            description={point.description}
          />
        ))}

      </div>
    </section>
  );
};

export { NftEarningPoints };
