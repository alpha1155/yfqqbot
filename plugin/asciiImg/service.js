const axios = require('axios')

async function getImage(url) {
  return new Promise(async (resolve, reject) => {
    let imgUrl = ''
    await axios({
      method: 'POST',
      url: " http://127.0.0.1:8000/picture",
      timeout: 120000,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data: {
        "imgParam": {
          "img_url": "https://c2cpicdw.qpic.cn/offpic_new/0/2931470156-1644525957-E9DC8C8A20E03758A1A37C5830C6625B/0?term=3",
          "output": "success.jpg",
          "language": "chinese",
          "mode": "standard",
          "background": "black",
          "num_cols": 500,
          "scale": 2
        }
      }
    }).then(res => {
      let data = res.data
      imgUrl = res.data.message
      console.log(data)
      console.log(imgUrl)
    })
    // res.body.pipe(stream)

    resolve([
      {
        type: 'image',
        data: {
          file: 'file://' + imgUrl,
        },
      },
    ])
  })
}

module.exports = {
  getImage,
}
