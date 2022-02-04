import React, { FC, CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  label?: string,
  className?: string,
  style?: CSSProperties,
};

const BackLink: FC<Props> = ({
  label = 'Back',
  className,
  style = {},
}) => {
  const history = useHistory();
  return (
    <button
      type="button"
      className={cx(styles.link, className)}
      style={style}
      onClick={() => history.goBack()}
    >
      {label}
    </button>
  );
};

export default BackLink;
