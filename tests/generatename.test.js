/* eslint-disable no-undef */
import generateName from '../src/helpers/generatename';

test('should return a 5 character string', () => {
  const word = generateName();
  expect(typeof word).toBe('string');
  expect(word.length).toBe(5);
});
