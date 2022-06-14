const axios = require('axios')
async function getDog() {
  try {
    // let params = new FormData();
    // params.append('key', bd12a49c149f736f9bdb18561e75e7b7);
    const { data } = await axios('http://api.tianapi.com/tiangou/index?key=bd12a49c149f736f9bdb18561e75e7b7')
    // const { data } = await axios({
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   method: 'get',
    //   url: 'http://api.tianapi.com/tiangou/index',
    //   params: { "key": "bd12a49c149f736f9bdb18561e75e7b7" },
    //   params: params,
    // })

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
