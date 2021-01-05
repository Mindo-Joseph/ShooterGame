/* eslint-disable no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime';

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
const generateGameId = (name) => {
  const gameName = name;
  const config = {
    name: gameName,
  };
  creategame(config).then((gamename) => {
    let string = gamename.result;
    string = string.slice(14, 34);
    localStorage.setItem('Id', string);
  });
  return true;
};
const scoreApiCall = async (object) => {
  try {
    const hashedName = localStorage.getItem('Id');
    const response = await fetch(
      `${baseUrl}games/${hashedName}/scores`,
      {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',

        },
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const setScore = async (object) => {
  try {
    const id = localStorage.getItem('Id');
    scoreApiCall(object, id);
    return true;
  } catch (error) {
    return error;
  }
};

export { creategame, setScore, generateGameId };
