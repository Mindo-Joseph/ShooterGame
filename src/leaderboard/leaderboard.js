/* eslint-disable no-unused-vars */
import regeneratorRuntime from "regenerator-runtime";
import {SAVED_NAME} from "../scenes/BootScene";

const baseUrl =
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/";

const creategame = async () => {
  try {
    const config = {
      name : SAVED_NAME,
    };
    const response = await fetch(`${baseUrl}games/`, {
      method : "POST",
      body : JSON.stringify(config),
      headers : {"Content-type" : "application/json; charset=UTF-8"},
    });
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
  } catch (error) {
    return error;
  }
};
const hashedGameName = [];
const setScore = async (object) => {
  try {
    // hashedGameName = JSON.parse(hashedGameName);
    // console.log(hashedGameName);
    creategame().then((name) => {
      const string = name.result;
      hashedGameName.push(string.slice(14, 34));
    });

    const proxyUrl = "https://mysterious-ridge-02468.herokuapp.com/";

    const response =
        await fetch(`${proxyUrl}${baseUrl}games/${hashedGameName[0]}/scores`, {
          method : "POST",
          body : JSON.stringify(object),
          headers : {
            "Content-type" : "application/json; charset=UTF-8",
          },
        });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default setScore;
