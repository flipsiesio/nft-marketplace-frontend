import { ReactNode } from 'react';
import { Props as ReactSelectProps } from 'react-select';

export interface SelectProps extends ReactSelectProps {
  label?: string,
  error?: string,
  controlContainer?: ReactNode,
}

export type SelectOption = {
  label: string,
  value: string,
};
