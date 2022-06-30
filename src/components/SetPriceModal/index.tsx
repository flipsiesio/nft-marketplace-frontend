import React, {
  ChangeEventHandler, FC, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, Text, Input, Button,
} from 'components';
import styles from './styles.module.scss';

type Props = {
  isLoading: boolean
  isOpen?: boolean
  onToggle: () => void
  onSubmit: (value: string) => void
};

const SetPriceModal: FC<Props> = ({
  isLoading,
  isOpen = false,
  onSubmit,
  onToggle,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');

  const submitHandler = useCallback(() => {
    onSubmit(value);
  }, [onSubmit, value]);

  const changeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setValue(e.target.value);
  }, []);

  const hasError = useMemo(() => {
    if (value.length === 0) return true;

    const reg = /([0-9]*[.])?[0-9]+/;
    const execValue = reg.exec(value);
    if (execValue === null) return true;
    if (value.length !== execValue[0].length) return true;

    const valueAfterPoint = value.split('.')[1];
    if (valueAfterPoint && valueAfterPoint.length > 6) return true;

    return false;
  }, [value]);

  return (
    <Modal classNameContent={styles.wrap} isOpen={isOpen} onClose={onToggle}>
      <Text className={styles.title}>{t('nftMarket.setPrice')}</Text>
      <Input placeholder={t('nftMarket.setPrice')} value={value} onChange={changeHandler} />
      <Button
        className={styles.button}
        onClick={submitHandler}
        disabled={isLoading || hasError}
      >
        {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
      </Button>
    </Modal>
  );
};

export { SetPriceModal };
