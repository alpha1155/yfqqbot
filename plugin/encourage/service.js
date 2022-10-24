const axios = require('axios')

const publicPath = 'http://api.muxiaoguo.cn/api/dujitang?api_key=becbd3e9ac6b555c'

async function getCos() {
  try {
    let res = await axios(publicPath)
    const text = res.data.data.comment
    console.log(text)
    return [
      {
        type: 'text',
        data: {
          text: text
        }
      }
    ]
  } catch (e) {
    console.error('[encourage]', e)
    return [
      {
        type: 'text',
        data: {
          text: '寄汤被喝了'
        }
      }
    ]
  }
}

module.exports = {
  getCos
}
