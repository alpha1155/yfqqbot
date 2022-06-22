const express = require('express');
const port = 7700;

function createApp (port) {
  const app = express();
  const bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.listen(port, '0.0.0.0', () => {
    console.log(`running at http://"0.0.0.0":${port}`);
  })


  return app
}

module.exports = {
  createApp
}