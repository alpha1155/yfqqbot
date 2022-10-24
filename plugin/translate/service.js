const axios = require('axios')

const publicPath = 'http://api.muxiaoguo.cn/api/Tn_tencent?api_key=08e7493482a85a38&text='

async function getCos(text) {
  try {
    let res = await axios(publicPath + encodeURI(text))
    const tranText = res.data.data.Translation
    console.log(tranText)
    return [
      {
        type: 'text',
        data: {
          text: tranText
        }
      }
    ]
  } catch (e) {
    console.error('[mm]', e)
    return [
      {
        type: 'text',
        data: {
          text: '我不会'
        }
      }
    ]
  }
}

module.exports = {
  getCos
}
