import { marketURL, routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { nftMarketSelector, walletSelectors } from 'store/selectors';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Text } from '../components';
import { jackpotApi } from '../store/api';
import { JackpotIssue } from '../types';
import { WalletStatus } from '../store/wallet/types';

export const useJackpot = () => {
  const { t } = useTranslation();
  const accessToken = useShallowSelector(nftMarketSelector.getProp('accessToken'));
  const isAuth = useShallowSelector(nftMarketSelector.getProp('isAuth'));
  const { status } = useShallowSelector(walletSelectors.getState);
  const [requestIds, setRequestIds] = useState<string[]>([]);
  const [issuedReceived, setIssuedReceived] = useState(false);

  useEffect(() => {
    jackpotApi.defaults.headers.Authorization = `Bearer ${accessToken}`;

    if (requestIds.length === 0) return;

    requestIds.forEach((requestId) => {
      jackpotApi.post(
        marketURL.JACKPOT.SET_VIEWED,
        undefined,
        {
          params: {
            requestId,
          },
        },
      );
    });
  }, [requestIds, accessToken, t]);

  useEffect(() => {
    jackpotApi.defaults.headers.Authorization = `Bearer ${accessToken}`;
    if (status === WalletStatus.CONNECTED && isAuth && !issuedReceived) {
      setIssuedReceived(true);
      jackpotApi.get<JackpotIssue>(marketURL.JACKPOT.ISSUED).then((res) => {
        const { jackpots } = res.data;
        if (jackpots.length === 0) return;

        if (jackpots.some((j) => j.status === 1)) {
          toast.warn(t('jackpot.pendingJackpot'));
          return;
        }

        const ids: string[] = [];
        jackpots
          .filter((j) => j.status === 2)
          .forEach((j) => {
            ids.push(j.requestId);
            toast.success(
              <Text>
                {t('jackpot.wonJackpot{{id}}', { id: j.tokenId })}
                &nbsp;
                <a
                  style={{ color: '#f15566', fontWeight: 'bold' }}
                  href={`${routes.nftMarket.myGalleryProfile.root}?id=${j.tokenId}`}
                >
                  {t('jackpot.here')}
                </a>
              </Text>,
            );
          });

        setRequestIds(ids);
      });
    }
  }, [status, isAuth, accessToken, t, issuedReceived]);
};
