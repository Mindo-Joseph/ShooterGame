const path = require('path');
const express = require('express');

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
app.use(express.static(DIST_DIR));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



app.listen(8080, () => {

});