/* eslint-disable no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime';
import { SAVED_NAME } from '../scenes/BootScene';

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const creategame = async (object) => {
  try {
    const response = await fetch(`${baseUrl}games/`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};
const scoreApiCall = async (object, hashedNameArray) => {
  try {
    const response = await fetch(
      `${baseUrl}games/${hashedNameArray[0]}/scores`,
      {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',

        },
        // Origin: 'http://localhost:8080',
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};
const setScore = async (object) => {
  const hashedGameName = [];
  try {
    const config = {

      name: SAVED_NAME,
    };
    creategame(config).then((name) => {
      let string = name.result;
      string = string.slice(14, 34);

      hashedGameName.push(string);
      scoreApiCall(object, hashedGameName);
    });
    return true;
  } catch (error) {
    return error;
  }
};
export { creategame, setScore };
