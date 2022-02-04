import React, { FC } from 'react';
import cx from 'classnames';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon } from 'components';
import styles from './styles.module.scss';

type Props = {
  value: string,
  className?: string,
  afterCopy?: () => void,
};

const Copy: FC<Props> = ({
  value,
  className,
  afterCopy = () => {},
}) => (
  <div className={cx(styles.wrap, className)}>
    <span className={styles.value}>{value}</span>
    <CopyToClipboard
      text={value}
      onCopy={() => {
        toast.success('Copied!');
        afterCopy();
      }}
    >
      <button type="button" className={styles.icon}>
        <Icon icon="copy" />
      </button>
    </CopyToClipboard>
  </div>
);

export default Copy;
