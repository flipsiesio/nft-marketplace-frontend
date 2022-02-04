import React, { FC } from 'react';
import cx from 'classnames';
import { tronSelector } from 'store/selectors';
import { Button, H4 } from 'components';
import { useTranslation, Trans } from 'react-i18next';
import { useShallowSelector, useConnectWallet } from 'hooks';
import { history } from 'utils';
import { routes, TronStatus } from 'appConstants';
import previewLogo from 'assets/img/previewLogo.png';
import cardsChips from 'assets/img/cardsChips.png';
import styles from './styles.module.scss';

type Props = {
  className?: string,
};

const Preview: FC<Props> = ({ className }) => {
  const tronStatus = useShallowSelector(tronSelector.getProp('status'));
  const { t } = useTranslation();
  const { handleConnect } = useConnectWallet();

  return (
    <section className={cx(styles.section, className)}>
      <div className={styles.previewBg}>
        <img className={styles.previewLogo} src={previewLogo} alt="Poker based app" />
        <img src={cardsChips} alt="Poker based app" />
      </div>

      <Button
        theme="play"
        use="rounded"
        size="big"
        bold
        disabled={tronStatus !== TronStatus.ADDRESS_SELECTED}
        className={styles.playBtn}
        onClick={() => {
          if (tronStatus === TronStatus.ADDRESS_SELECTED) history.push(routes.game.root);
        }}
      >
        {t('preview.playNow')}
      </Button>

      <div className={styles.btnWrap}>
        {tronStatus !== TronStatus.ADDRESS_SELECTED && (
          <H4 className={styles.noAuthText} align="center">
            <Trans i18nKey="preview.title">
              Please
              <Button className={styles.signInBtn} onClick={() => handleConnect()}>sign in</Button>
              to TronLink and connect wallet to play
            </Trans>
          </H4>
        )}
      </div>
    </section>
  );
};

export default Preview;
