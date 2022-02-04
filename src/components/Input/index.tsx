import React, { FC, ChangeEvent } from 'react';
import cx from 'classnames';
import { Icon } from 'components';
import styles from './styles.module.scss';

type Props = {
  type?: 'text' | 'email',
  name?: string,
  value?: string,
  label?: string,
  disabled?: boolean,
  placeholder?: string,
  className?: string,
  classNameWrap?: string,
  error?: boolean | string,
  isCorrect?: boolean,
  autoComplete?: 'off' | 'on',
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
};

const Input: FC<Props> = ({
  type = 'text',
  name = 'input',
  value,
  placeholder = '',
  label = '',
  className,
  disabled = false,
  error,
  isCorrect = false,
  classNameWrap,
  autoComplete = 'off',
  onChange = () => {},
}) => (
  <div className={cx(styles.wrap, classNameWrap)}>
    {label && <label htmlFor={name} className={styles.label}>{label}</label>}
    <div className={styles.inputWrap}>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={cx(
          styles.input,
          {
            [styles.error]: error,
          },
          className,
        )}
        onChange={onChange}
      />

      {error && <Icon icon="cancel" className={cx(styles.icon, styles.iconError)} />}
      {isCorrect && <Icon icon="checkmark" className={cx(styles.icon, styles.iconCorrect)} />}
    </div>
    {error && <span className={styles.textError}>{`* ${error}`}</span>}
  </div>
);

export default Input;
