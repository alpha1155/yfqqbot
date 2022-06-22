const express = require('express');
const port = 9988;
const app = express();

app.listen(port, () => {
  console.log(`running at http://127.0.0.1:${port}`);
})

app.post('/githook', (req, res) => {
  console.log(req)
  res.send('hello world')
})