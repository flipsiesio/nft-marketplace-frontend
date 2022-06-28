import { TronStatus, routes, marketURL } from 'appConstants';
import { useShallowSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { nftMarketSelector, tronSelector } from 'store/selectors';
import { toast } from 'react-toastify';
import { Link, Text } from '../components';
import { jackpotApi } from '../store/api';
import { JackpotIssue } from '../types';

export const useJackpot = () => {
  const accessToken = useShallowSelector(nftMarketSelector.getProp('accessToken'));
  const isAuth = useShallowSelector(nftMarketSelector.getProp('isAuth'));
  const { status } = useShallowSelector(tronSelector.getState);
  const [requestIds, setRequestIds] = useState<string[]>([]);

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
  }, [requestIds, accessToken]);

  useEffect(() => {
    jackpotApi.defaults.headers.Authorization = `Bearer ${accessToken}`;

    if (status === TronStatus.ADDRESS_SELECTED && isAuth) {
      jackpotApi.get<JackpotIssue>(marketURL.JACKPOT.ISSUED).then((res) => {
        const { jackpots } = res.data;
        if (jackpots.length === 0) return;

        if (jackpots.some((j) => j.status === 1)) {
          toast.warn('You have won the jackpot. The jackpot is pending...');
          return;
        }

        const ids: string[] = [];
        jackpots
          .filter((j) => j.status === 2)
          .forEach((j) => {
            ids.push(j.requestId);
            toast.success(
              <Text>
                You have won the jackpot ID #41. It can be viewed
                &nbsp;
                <Link
                  style={{ color: '#f15566', fontWeight: 'bold' }}
                  to={`${routes.nftMarket.myGalleryProfile.root}?=id${j.tokenId}`}
                >
                  here
                </Link>
              </Text>,
            );
          });

        setRequestIds(ids);
      });
    }
  }, [status, isAuth, accessToken]);
};
