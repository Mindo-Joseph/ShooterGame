/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import { creategame, setScore } from '../src/leaderboard/leaderboard';

test('service takes in a name and generates a gameId', async () => {
  try {
    fetch.mockResponseOnce(JSON.stringify([{ result: 'Game with ID: UFObeD7EaQc1TPJVNKUt added.' }]));
    const obj = {
      name: 'Test-Game',
    };
    const onResponse = jest.fn();
    const onError = jest.fn();
    return creategame(obj).then(onResponse).catch(onError).finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual({ result: 'Game with ID: UFObeD7EaQc1TPJVNKUt added.' });
    });
  } catch (error) {
    return error;
  }
});

test('service sets score for a gameId', async () => {
  try {
    fetch.mockResponse(JSON.stringify([{ result: 'Leaderboard score created correctly.' }]));
    const obj = {
      user: 'Test-User',
      score: 30,
    };
    const gameId = 'UFObeD7EaQp1TPJVNKUt';
    const onResponse = jest.fn();
    const onError = jest.fn();
    try {
      await setScore(obj, gameId).then(onResponse);

      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual({ result: 'Laderboard score created correctly.' });
      return true;
    } catch (error) {
      return error;
    }
  } catch (error) {
    return error;
  }
});
