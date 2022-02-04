import queryString from 'query-string';
import { history } from 'utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUrlParameter(name: string): string | undefined {
  const { search } = history.location;
  const target = queryString.parse(search);
  return target[name]?.toString();
}

export default getUrlParameter;
