function toFar(cel) {
  return ((cel * 9) / 5) + 32;
}

export default function SwapMeasureScale(to, value) {
  let res = 0;
  let sign;
  switch (to) {
    case 'f':
      res = toFar(value);
      sign = 'f';
      break;
    case 'c':
      res = value;
      sign = 'c';
      break;
    default:
      throw Error(`Unknown scale: ${to}`);
  }
  return `${res.toFixed(2)}${sign}`;
}
