import React, { FC, ChangeEvent, ReactNode } from 'react';
import cx from 'classnames';
import { Text } from 'components';
import styles from './styles.module.scss';

type Props = {
  name: string,
  checked?: boolean,
  error?: boolean | string,
  label?: string | ReactNode,
  disabled?: boolean,
  className?: string,
  classNameCheckmark?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>, value: boolean) => void,
};

const Checkbox: FC<Props> = ({
  name,
  checked = false,
  error = '',
  label = '',
  disabled = false,
  className,
  onChange = () => {},
  classNameCheckmark,
}) => (
  <div className={cx(styles.wrap, className)}>
    <label htmlFor={name} className={cx(styles.checkbox)}>
      <input
        type="checkbox"
        disabled={disabled}
        id={name}
        checked={checked}
        className={cx(
          styles.input,
          {
            [styles.errorCheckbox]: error,
          },
        )}
        onChange={(e) => onChange(e, !checked)}
      />
      <span className={cx(
        styles.checkmark,
        classNameCheckmark,
        {
          [styles.error]: error,
        },
      )}
      />
      {label && (
        <span
          className={cx(
            styles.text,
            {
              [styles.error]: error,
            },
          )}
        >
          {label}
        </span>
      )}
    </label>
    {error && <Text className={styles.errorText} color="error" size="tiny" tag="span">* {error}</Text>}
  </div>
);

export default Checkbox;
