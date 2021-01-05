const baseUrl =
  "https://us-central1-js-capstone-backend.cloudfunctions.net/api/";

const getScore = async (gameId) => {
  try {
    const response = await fetch(`${baseUrl}games/${gameId}/scores`, {
      method: "GET",
    });
    return await response.json().then((results) => results.result);
  } catch (error) {
    return error;
  }
};

const displayresults = (array) => {
  const container = document.querySelector("#container");

  array.forEach((result) => {
    const singlePlayer = document.createElement("div");
    singlePlayer.className = "player1";
    const score = document.createElement("div");
    const playerName = document.createElement("h1");
    playerName.textContent = `${result.user}`;
    const scorePointsLst = document.createElement("ul");
    const scoreListItem = document.createElement("li");
    scoreListItem.className = "scoreblock";
    scoreListItem.textContent = `${result.score}`;
    scorePointsLst.appendChild(scoreListItem);
    score.appendChild(playerName);
    score.appendChild(scorePointsLst);
    singlePlayer.appendChild(score);
    container.appendChild(singlePlayer);
  });
};
const render = async () => {
  const id = localStorage.getItem("Id");
  const resultsArray = await getScore(id);
  displayresults(resultsArray);
};
render();