import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { marketURL } from '../appConstants';
import { marketClient } from '../store/api';
import { walletSelectors } from '../store/selectors';
import { BidCardState, SaleCardState } from '../types';
import { fromWeiToNumber, getBidPrice, getMyBidPrice } from '../utils';

const getState = <T>(url:string, id: string) => {
  return marketClient.get<T>(url, {
    params: {
      byOrder: false,
      ids: [id],
    },
  });
};

export const useMyProfileHandlers = () => {
  const location = useLocation();
  const address = useSelector(walletSelectors.getProp('address'));
  const [isSale, setIsSale] = useState(false);
  const [isBid, setIsBid] = useState(false);
  const [salePrice, setSalePrice] = useState('0');
  const [bidPrice, setBidPrice] = useState('0');
  const [myBidPrice, setMyBidPrice] = useState('0');
  const [isActive, setIsActive] = useState(true);
  const [actualBidOrderId, setActualOrderId] = useState<number>();

  const id = useMemo(() => {
    const search = new URLSearchParams(location.search);
    return search.get('id');
  }, []);

  useEffect(() => {
    if (!address) return;
    if (!id) return;

    getState<SaleCardState>(marketURL.MARKETPLACE.GET_ACTUAL_SALE, id).then((res) => {
      if (res.data) {
        setIsSale(true);
        setSalePrice(`${fromWeiToNumber(res.data.price)}`);
        setIsActive(res.data.active);
      }
    });
  }, [address, id]);

  useEffect(() => {
    if (!address) return;
    if (!id) return;

    getState<BidCardState>(marketURL.MARKETPLACE.GET_ACTUAL_BIDS, id).then((res) => {
      if (res.data) {
        setIsBid(true);
        setMyBidPrice(getMyBidPrice(address, res.data));
        setBidPrice(getBidPrice(res.data));
        setIsActive(res.data.active);
        setActualOrderId(res.data.orderIndex);
      }
    });
  }, [address, id]);

  return {
    isSale,
    isBid,
    id,
    salePrice,
    bidPrice,
    isActive,
    actualBidOrderId,
    myBidPrice,
  };
};
