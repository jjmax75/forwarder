const fetch = require('node-fetch');

const {
  SPACESHIP_ENDPOINT,
  M0NIT0R_ENDPOINT,
  SKYANALYTICS_ENDPOINT,
} = require('./constants');

const {
  capitalisePropNames,
  flattenObj
} = require('./helpers');

const spaceship = event => {
  console.log('sending to spacship');
  const response = flattenObj(event);
  fetch(SPACESHIP_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const m0nit0r = event => {
  console.log('sending to m0nit0r');
  const ts = Math.round(Date.now() / 1000);
  fetch(`${M0NIT0R_ENDPOINT}/${ts}`, {
    method: 'PUT',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const skyanalytics = async event => {
  console.log('sending to skyanalytics');
  const response = await capitalisePropNames(event);
  
  fetch(SKYANALYTICS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

module.exports = {
  spaceship,
  m0nit0r,
  skyanalytics,
};
