/* eslint-disable no-undef */
import SwapMeasureScale from '../src/SwapMeasureScale';

const F = 'f';
const C = 'c';

test('SwapMeasureScale throwing error if incorrect scale passed', () => {
  const fakeScale = 'de';
  const call = () => SwapMeasureScale(fakeScale, 10);
  expect(call).toThrow();
});

test('SwapMeasureScale temp have to be transformed to correct string', () => {
  const temp = 30;
  const correct = `${temp.toFixed(2)}c`;
  const value = SwapMeasureScale(C, temp);
  expect(value).toBe(correct);
});

test('SwapMeasureScale should transform celsius to fahrenheit', () => {
  const temp = 30;
  const correct = `${(86).toFixed(2)}f`;
  const value = SwapMeasureScale(F, temp);
  expect(value).toBe(correct);
});
