const express = require('express');

const handler = require('./handler');

const app = express();

app.get('/', (req, res) => {
  res.send('intergalactic');
});

app.listen(1337, () => console.log('server is listening on http://localhost:1337'));
