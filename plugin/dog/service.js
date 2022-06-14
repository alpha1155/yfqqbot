const axios = require('axios')
async function getDog () {
  try {
    const { data } = await axios('http://api.tianapi.com/tiangou/index?key=bd12a49c149f736f9bdb18561e75e7b7')

    return [
      {
        type: 'text',
        data: {
          text: data['newslist'][0]['content']
        }
      }
    ]
  } catch (e) {
    console.error('[dog]', e)
    return [
      {
        type: 'text',
        data: {
          text: '舔不动了'
        }
      }
    ]
  }
}

module.exports = {
  getDog
}
