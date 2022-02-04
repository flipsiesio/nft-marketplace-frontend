import React, { FC, ReactNode, useState } from 'react';
import SlideDown from 'react-slidedown';
import cx from 'classnames';
import { Text, Icon } from 'components';
import styles from './styles.module.scss';

type Value = { title: string, content: ReactNode };
type Props = {
  value: Value,
  isDefaultOpen?: boolean,
  className?: string,
};

const Accordion: FC<Props> = ({ value, isDefaultOpen = false, className }) => {
  const { title, content } = value;
  const [open, setOpen] = useState<boolean>(isDefaultOpen);

  return (
    <div
      className={cx(styles.wrap, className, { [styles.opened]: open })}
    >
      <div className={styles.header} onClick={() => setOpen(!open)}>
        <Text bold color="success">{title}</Text>
        {open && (
          <span className={styles.chevron}>
            <Icon icon="chevron" />
          </span>
        )}
      </div>

      <SlideDown>
        {open && <div className={styles.content}>{content}</div>}
      </SlideDown>
    </div>
  );
};

export default Accordion;
