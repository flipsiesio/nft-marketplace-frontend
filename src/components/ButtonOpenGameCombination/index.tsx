import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';
import { Icon } from '../index';

type ButtonOpenGameCombinationProps = {
  className?: string,
  handlerOpen: () => void,
};

const ButtonOpenGameCombination = ({ className, handlerOpen }: ButtonOpenGameCombinationProps) => (
  <button
    type="button"
    className={cx(styles.buttonOpenGameCombination, className)}
    onClick={handlerOpen}
  >
    <Icon icon="cards" />
  </button>
);

export default ButtonOpenGameCombination;
