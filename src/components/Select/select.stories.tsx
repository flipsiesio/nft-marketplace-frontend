import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import Select from '.';

storiesOf('Basic', module).add('Select', () => {
  const label = text('Label', 'label');
  const isSearchable = boolean('IsSearchable', false);
  const isMulti = boolean('IsMulti', false);
  const options = [
    { label: 'David', value: '1' },
    { label: 'Brad', value: '2' },
    { label: 'Leonardo', value: '3' },
  ];
  const onChange = action('change');

  return (
    <div style={{ width: 300 }}>
      <Select
        options={options}
        isSearchable={isSearchable}
        isMulti={isMulti}
        value={isMulti ? [options[0], options[1]] : options[0]}
        label={label}
        onChange={onChange}
      />
    </div>
  );
});
