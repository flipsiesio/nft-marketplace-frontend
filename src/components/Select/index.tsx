/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import RSelect from 'react-select';
import cx from 'classnames';
import { Text } from 'components';
import { SelectProps as Props } from 'types';
import './styles.scss';

const Select: FC<Props> = ({
  options,
  value = '',
  error = '',
  placeholder = 'Select value',
  label = '',
  name = 'select',
  className,
  isSearchable = false,
  isMulti = false,
  onChange = () => {},
  selectContainer,
  ...rest
}) => (
  <div className={cx(className)}>
    {label && <Text bold className="rs__label">{label}</Text>}
    <RSelect
      {...rest}
      options={options}
      value={value as never}
      placeholder={placeholder}
      name={name}
      isMulti={isMulti}
      allowSelectAll
      isClearable={false}
      isSearchable={isSearchable}
      hideSelectedOptions={false}
      className="rs__select"
      classNamePrefix="rs"
      onChange={onChange}
    />
    {error && <Text color="error">{error}</Text>}
  </div>
);

export default Select;
