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

const publicPath = 'https://api.muxiaoguo.cn/api/Tn_tencent?api_key=08e7493482a85a38&text='

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
