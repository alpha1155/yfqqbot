const express = require('express');
const ws = require('../bot/ws');
const port = 9988;
const app = express();

app.listen(port, () => {
    console.log(`running at http://127.0.0.1:${port}`);
})

app.post('/githook', (req, res) => {
    ws.send('send_private_msg', {
        user_id: 2931470156,
        message: req
    })
    console.log(req)
    res.send('hello world')
})