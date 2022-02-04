import { Network, NETWORK_URL } from 'appConstants';

function getNetworkName(url: string): Network | null {
  const target = (Object.keys(NETWORK_URL) as Network[]).find((key) => NETWORK_URL[key] === url);
  return target || null;
}

export default getNetworkName;
