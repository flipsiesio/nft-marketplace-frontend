export default function (timeInMs: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), timeInMs);
  });
}
