import { toast } from 'react-toastify';

export const getMyAddress = () => {
  if (window.tronWeb) {
    return window.tronWeb.defaultAddress?.base58 || window.tronLinkInitialData?.address;
  }
  return '';
};

export function getMyName():string {
  return window.tronWeb.defaultAddress?.name || window.tronLinkInitialData?.name || 'Player';
}

export function checkTronAuth():boolean {
  const address = getMyAddress();
  return Boolean(address);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTronContract = async (address: string): Promise<any> => {
  try {
    const contract = await window.tronWeb.contract().at(address);
    return contract;
  } catch (err) {
    toast.error(err);
    throw err;
  }
};

export const getTrxFromSun = (sun: string) => {
  if (window.tronWeb) {
    return Number(window.tronWeb.fromSun(sun));
  }
  return 0;
};
