
const axios = require('axios')

const publicPath = 'http://api.muxiaoguo.cn/api/caihongpi?api_key=62d91d51b2b25707'

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
    console.error('[mm]', e)
    return [
      {
        type: 'text',
        data: {
          text: '我爱你'
        }
      }
    ]
  }
}

module.exports = {
  getCos
}
