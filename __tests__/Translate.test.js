/* eslint-disable no-undef */
import {
  getDaysByLanguage, getPlaceholderText, getSubmitText, getUpdateButtonText,
} from '../src/Translate';

const ru = 'ru';
const en = 'en';
const be = 'be';

test('getDaysByLanguage', () => {
  const currentDay = 3;
  const correct = ['wed', 'thu', 'fri'];
  const days = getDaysByLanguage(currentDay, en);
  expect(days).toStrictEqual(correct);
});

test('getDaysByLanguage return correct array of russian days', () => {
  const currentDay = 3;
  const correct = ['срд', 'чтв', 'птн'];
  const days = getDaysByLanguage(currentDay, ru);
  expect(days).toStrictEqual(correct);
});

test('getDaysByLanguage return correct array of belorussian days', () => {
  const currentDay = 3;
  const correct = ['сер', 'чцв', 'пят'];
  const days = getDaysByLanguage(currentDay, be);
  expect(days).toStrictEqual(correct);
});

test('getDaysByLanguage throw error if language is unsupported or incorrect', () => {
  const currentDay = 3;
  const unsupportedLang = 'po';
  const call = () => getDaysByLanguage(currentDay, unsupportedLang);
  expect(call).toThrow();
});

test('getPlaceholderText return correct text', () => {
  const res = getPlaceholderText(ru);
  expect(res).toBe('Введите название города');
});

test('getSubmitText return correct text', () => {
  const res = getSubmitText(ru);
  expect(res).toBe('Отправить');
});

test('getUpdateButtonText', () => {
  const res = getUpdateButtonText(ru);
  expect(res).toBe('Обновить');
});
