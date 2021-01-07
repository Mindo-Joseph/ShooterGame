const path = require('path');
const express = require('express');

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const LEADERBOARD_HELPERS = path.join(__dirname, '/src/helpers');
const LEADERBOARD_FILES = path.join(__dirname, '/src/leaderboard');
const HTML_FILE = path.join(__dirname, 'index.html');
const LEADERBOARD = path.join(__dirname, '/src/leaderboard/leaderboard.html');
app.use(express.static(DIST_DIR));
app.use(express.static(LEADERBOARD_FILES));
app.use(express.static(LEADERBOARD_HELPERS));
app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});
app.get('/dist/leaderindex.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/leaderindex.js'));
});
app.get('/src/leaderboard/leaderboard.html', (req, res) => {
  res.sendFile(LEADERBOARD);
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

});
