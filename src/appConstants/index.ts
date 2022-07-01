export { default as routes } from './routes';
export { default as ERRORS } from './errors';
export { default as URL, marketURL } from './url';
export { default as RANKS } from './ranks';
export { default as LANGUAGE_OPTIONS } from './languageOptions';
export * from './enums';
export * from './gameType';
export * from './networkUrl';

export const PAGE_ITEM_LIMIT = 10;
export const MIN_DESKTOP_WIDTH = 980;
export const scanTransactionUrl = process.env.REACT_APP_SCAN_TRANSACTION_URL as string;
export const scanAddressUrl = process.env.REACT_APP_SCAN_ADDRESS_URL as string;
