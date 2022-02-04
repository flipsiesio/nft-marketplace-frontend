import React, {
  ChangeEvent,
  FocusEvent,
  FC,
  useState,
  useRef,
  useEffect,
} from 'react';
import cx from 'classnames';
import { Icon } from 'components';
import styles from './styles.module.scss';

type Props = {
  value: string,
  type?: 'text' | 'email',
  name?: string,
  className?: string,
  classNameWrap?: string,
  error?: boolean | string,
  placeholder?: string,
  isCorrect?: boolean,
  autoComplete?: 'off' | 'on',
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  afterSetEditable?: () => void,
  afterRemoveEditable?: () => void,
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void,
};

const EditableInput: FC<Props> = ({
  value,
  type,
  name = 'input',
  className,
  classNameWrap,
  error = '',
  placeholder = '',
  isCorrect = false,
  autoComplete = 'off',
  onChange = () => {},
  afterSetEditable = () => {},
  afterRemoveEditable = () => {},
  onBlur = () => {},
}) => {
  const [isEditable, setEditable] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  return (
    <div className={cx(styles.wrap, classNameWrap)}>
      <div className={styles.inputWrap}>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          disabled={!isEditable}
          ref={inputRef}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cx(
            styles.input,
            className,
          )}
          onChange={onChange}
          onBlur={(e) => {
            setEditable(false);
            onBlur(e);
          }}
        />
        {(error && isEditable) && <Icon icon="cancel" className={cx(styles.icon, styles.iconError)} /> }
        {(isCorrect && isEditable) && <Icon icon="checkmark" className={cx(styles.icon, styles.iconCorrect)} />}
      </div>

      <button
        type="button"
        className={cx(styles.editableBtn, { [styles.editableBtnActive]: isEditable })}
        onClick={() => {
          setEditable(!isEditable);
          if (isEditable) afterRemoveEditable();
          else afterSetEditable();
        }}
      >
        <Icon icon="pencil" />
      </button>

      {error && <span className={styles.textError}>{`* ${error}`}</span>}
    </div>
  );
};

export default EditableInput;
