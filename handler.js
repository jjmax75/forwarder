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

const sendData = (endpoint, method, payload) => {
  fetch(endpoint, {
    method,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.text();
  }).then(text => {
    console.log(text);
  }).catch(e => {
    throw new Error(e);
  });
}

const spaceship = event => {
  console.log('sending to spacship');
  const response = flattenObj(event);
  
  sendData(SPACESHIP_ENDPOINT, 'POST', response);
}

const m0nit0r = event => {
  console.log('sending to m0nit0r');
  const ts = Math.round(Date.now() / 1000);

  sendData(`${M0NIT0R_ENDPOINT}/${ts}`, 'PUT', event);
}

const skyanalytics = async event => {
  console.log('sending to skyanalytics');
  const response = await capitalisePropNames(event);
  
  sendData(SKYANALYTICS_ENDPOINT, 'POST', response);
};

module.exports = {
  spaceship,
  m0nit0r,
  skyanalytics,
};
