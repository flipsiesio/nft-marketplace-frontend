type PokerContract = {};

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Hand: any,
}

declare module '*.mp3' {
  const src: string;
  export default src;
}
