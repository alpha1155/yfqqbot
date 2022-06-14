// const random = require('random')
// const axios = require('axios')

// const max = 130
// const publicPath = 'https://gitee.com/npm/cos_pics/raw/master/'

// async function getCos() {
//   try {
//     const cos = 'cos_' + ('0000' + random.int(0, max)).slice(-4)
//     let { data } = await axios(`${publicPath}${cos}.js`)
//     data = JSON.parse(data.trim().slice(cos.length + 1, -1))
//     const item = data[random.int(0, data.length - 1)]
//     const file = publicPath + item.path
//     console.log(file)
//     return [
//       {
//         type: 'image',
//         data: {
//           file
//         }
//       },
//       {
//         type: 'text',
//         data: {
//           text: `\n${item.category} - ${item.suite}`
//         }
//       }
//     ]
//   } catch (e) {
//     console.error('[mm]', e)
//     return [
//       {
//         type: 'text',
//         data: {
//           text: '妹妹走丢了'
//         }
//       }
//     ]
//   }
// }

// module.exports = {
//   getCos
// }

const axios = require('axios')

const publicPath = 'https://api.muxiaoguo.cn/api/meinvtu?api_key=fb06ed58f604f91b&num=1'

async function getCos(city) {
  try {


    let url =
    "https://api.muxiaoguo.cn/api/tianqi?api_key=af0fc6a85b69a59d&type=1&city=";
    let message = await axios({ url: url + encodeURI(city), method: "get" }).then((res) => {
      console.log(res.data.data);
      let data = res.data.data;
      let msg = `${data.cityname}今日天气\n温度：${data.temp}\n风向：${data.WD}\n风级：${data.WS}\n风速：${data.wse}\n相对湿度：${data.SD}\n天气：${data.weather}\nPM2.5指数：${data.pm25}\n最新更新时间：${data.time}`;
      return msg
    });


    return [
      {
        type: 'text',
        data: {
          text: message
        }
      }
    ]
  } catch (e) {
    console.error('[mm]', e)
    return [
      {
        type: 'text',
        data: {
          text: '天气找不到'
        }
      }
    ]
  }
}

module.exports = {
  getCos
}
