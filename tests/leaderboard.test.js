/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import { creategame, setScore } from '../src/leaderboard/leaderboard';

beforeEach(() => {
  fetch.resetMocks();
});

test('service takes in a name and generates a gameId', async () => {
  fetch.mockResponseOnce(JSON.stringify([{ result: 'Game with ID: UFObeD7EaQp1TPJVNKUt added.' }]));
  const obj = {
    name: 'Test-Game',
  };
  const onResponse = jest.fn();
  const onError = jest.fn();
  return creategame(obj).then(onResponse).catch(onError).finally(() => {
    expect(onResponse).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(onResponse.mock.calls[0][0][0]).toEqual({ result: 'Game with ID: UFObeD7EaQp1TPJVNKUt added.' });
  });
});

test('service sets score for a gameId', async () => {
  fetch.mockResponse(JSON.stringify([{ result: 'Leaderboard score created correctly.' }]));
  const obj = {
    user: 'Test-User',
    score: 30,
  };
  const gameId = 'UFObeD7EaQp1TPJVNKUt';
  const onResponse = jest.fn();
  const onError = jest.fn();
  return setScore(obj, gameId).then(onResponse).catch(onError).finally(() => {
    expect(onResponse).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(onResponse.mock.calls[0][0][0]).toEqual({ result: 'Leaderboard score created correctly.' });
  });
});
