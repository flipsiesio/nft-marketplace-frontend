import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import EditableInput from '.';

const onChange = action('onChange');
const afterSetEditable = action('afterSetEditable');
const afterRemoveEditable = action('afterRemoveEditable');

storiesOf('Basic', module).add('EditableInput', () => {
  const value = text('Value', 'Zero 1');
  const isCorrect = boolean('Is correct', false);
  const error = text('Error', '');
  const placeholder = text('Placeholder', '');

  return (
    <EditableInput
      value={value}
      isCorrect={isCorrect}
      error={error}
      placeholder={placeholder}
      onChange={onChange}
      afterSetEditable={afterSetEditable}
      afterRemoveEditable={afterRemoveEditable}
    />
  );
});
