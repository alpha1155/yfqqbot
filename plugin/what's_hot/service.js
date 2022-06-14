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



async function getCos () {
  try {


    let url =
      "https://tenapi.cn/zhihuresou/";
    let message = await axios({ url: url, method: "get" }).then((res) => {
      console.log(res.data.list);
      let data = res.data.list;
      let msg = '知乎热搜：'
      for (let item of data) {
        msg += '\n' + item.name;
      }
      return msg;
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
    console.error('[zhihu]', e)
    return [
      {
        type: 'text',
        data: {
          text: 'zhihu找不到'
        }
      }
    ]
  }
}

module.exports = {
  getCos
}
