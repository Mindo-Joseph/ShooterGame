const path = require('path');
const express = require('express');

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(__dirname, 'index.html');
const LEADERBOARD_FILE = path.join(__dirname,'/src/leaderboard/leaderboard.html')
app.use(express.static(DIST_DIR));
app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});
app.get('/src/leaderboard/leaderboard.html', (req, res) => {
  res.sendFile(LEADERBOARD_FILE);
})
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

});