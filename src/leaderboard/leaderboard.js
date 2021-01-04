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
const scoreApiCall = async (object, hashedName) => {
  try {
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
const generateGameId = (name) => {
  const gameName = name;
  const config = {
    name: gameName,
  };
  creategame(config).then((name) => {
    let string = name.result;
    string = string.slice(14, 34);
    console.log(string);
    localStorage.setItem('Id', string);
  });
  return true;
}
const setScore = async (object, name) => {
  try {
    generateGameId(name);
    const id = localStorage.getItem('Id');
    scoreApiCall(object, id);
    return true;
  } catch (error) {
    return error;
  
  };
};
const getScore = async (gameId) => {
  const resultsArray = [];
  try {
    const response = await fetch(`${baseUrl}games/${gameId}/scores`, {
      method: 'GET'
    });
    await response.json().then((results) => resultsArray.push(results.result));
    return resultsArray;
  } catch (error) {
    return error;
  }
}
export { creategame, setScore, getScore, generateGameId };
