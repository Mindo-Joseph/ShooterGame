import { getScore } from '../leaderboard/leaderboard';
const displayresults = (arrayResults) => {
    const container = document.querySelector('#container');
    arrayResults.forEach((result) => {
        const singlePlayer = document.createElement('div');
        singlePlayer.className = 'player1';
        const score = document.createElement('div');
        const playerName = document.createElement('h1');
        playerName.textContent = `${result.user}`;
        const scorePointsLst = document.createElement('ul');
        const scoreListItem = document.createElement('li');
        scoreListItem.className = 'scoreblock';
        scoreListItem.textContent = `${result.score}`;
        scorePointsLst.appendChild(scoreListItem);
        score.appendChild(playerName);
        score.appendChild(scorePointsLst);
        singlePlayer.appendChild(score);
        container.appendChild(singlePlayer);

    })

}
const id = localStorage.getItem('Id');
const fetched_results = getScore(id);

displayresults(fetched_results);