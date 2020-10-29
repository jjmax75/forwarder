const express = require('express');

const handler = require('./handler');

const app = express();
app.use(
  // https://stackoverflow.com/a/45352933/1377969
  express.raw({ type : 'application/x-www-form-urlencoded' }),
  function(req, res, next) {
    try {
      req.body = JSON.parse(req.body);
    } catch(e) {
      console.log('error:', e);
    };
    next();
  }
);

app.post('/', async (req, res) => {
  for (let event of req.body.events) {
    handler.spaceship(event);
    handler.m0nit0r(event);
    handler.skyanalytics(event);
  }
  
  res.send('intergalactic');
});

app.listen(1337, () => console.log('server is listening on http://localhost:1337'));
