import React, { FC, useMemo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { connect, ConnectedProps } from 'react-redux';
import {
  Text,
  H3,
  Input,
  Button,
  ProgressBar,
  Preloader,
} from 'components';
import { TrxUsdConverter } from 'containers';
import { ERRORS } from 'appConstants';
import { getRankPercent } from 'utils';
import { referralCreateLinkAction } from 'store/referral/actions';
import type { State, Dispatch } from 'types';
import styles from './styles.module.scss';

const mapStateToProps = ({
  me,
  referral,
}: State) => ({
  isEmailConfirm: me.isEmailConfirm,
  referral,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  createLink: (email: string) => dispatch(referralCreateLinkAction(email)),
});
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

type Values = {
  email: string,
};
const initialValues: Values = {
  email: '',
};

const validationSchema = object().shape({
  email: string().required(ERRORS.required).email(ERRORS.email),
});

const Referral: FC<Props> = ({
  referral,
  isEmailConfirm,
  createLink,
}) => {
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleSubmit,
  } = useFormik<Values>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: ({ email }) => {
      createLink(email);
    },
  });

  const rankValueTrx = useMemo(() => window.tronWeb.fromSun(referral.rank), [referral.rank]);
  const rankMaxValueTrx = useMemo(() => {
    return window.tronWeb.fromSun(referral.rankMaxValue);
  }, [referral.rankMaxValue]);

  return (
    <Preloader isLoading={false}>
      <Text size="big" className={styles.previewText}>
        {t('referral.title')}
      </Text>

      {!isEmailConfirm ? (
        <>
          <H3 className={styles.noConfirmTitle}>
            {t('referral.provideEmail')}
          </H3>
          <form className={styles.noConfirmForm} onSubmit={handleSubmit}>
            <Input
              name="email"
              value={values.email}
              placeholder={t('referral.enterEmail')}
              classNameWrap={styles.noConfirmInput}
              error={errors.email && touched.email ? errors.email : ''}
              isCorrect={isValid}
              onChange={handleChange}
            />
            <Button type="submit">{t('referral.join')}</Button>
          </form>
        </>
      ) : (
        <>
          <H3 className={styles.confirmTitle}>{t('referral.rankUp')}</H3>

          <div className={styles.confirmForm}>
            <Input
              label={`${t('referral.yourReferralLink')}:`}
              value={referral.link}
              disabled
              classNameWrap={styles.confirmInput}
            />
            <CopyToClipboard
              text={referral.link}
              onCopy={() => toast.success('Copied!')}
            >
              <Button icon="copy">{t('referral.copy')}</Button>
            </CopyToClipboard>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressBarHeader}>
              <Text bold className={styles.progressBarLabel}>{t('referral.completeRank')}</Text>
              <Text
                bold
                className={styles.progressBarValue}
              >
                {rankValueTrx}
                {' / '}
                {rankMaxValueTrx} TRX
              </Text>
              <Text
                color="gray"
                bold
                size="small"
                className={styles.progressBarUsd}
                align="right"
              >
                <TrxUsdConverter trx={Number(rankMaxValueTrx)} />
              </Text>
            </div>
            <ProgressBar value={getRankPercent(rankValueTrx, rankMaxValueTrx)} />
          </div>
        </>
      )}
    </Preloader>
  );
};

export default connector(Referral);
