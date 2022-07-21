const axios = require('axios')

async function getImage(url, num_cols, color) {
  return new Promise(async (resolve, reject) => {
    let imgUrl = ''
    await axios({
      method: 'POST',
      url: " http://127.0.0.1:8000/picture",
      timeout: 1200000,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data: {
        "imgParam": {
          "img_url": url,
          "output": "success.jpg",
          "language": "chinese",
          "mode": "standard",
          "background": color,
          "num_cols": num_cols,
          "scale": 2
        }
      }
    }).then(res => {
      let data = res.data
      imgUrl = res.data.message
      console.log(data)
      console.log(imgUrl)
    })

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
