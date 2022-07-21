const axios = require('axios')

async function getZhihuHot() {
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
async function getDouyinHot() {
  try {
    let url =
      "https://tenapi.cn/douyinresou/";
    let message = await axios({ url: url, method: "get" }).then((res) => {
      console.log(res.data.list);
      let data = res.data.list;
      let msg = '抖音热搜：'
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
    console.error('[douyin]', e)
    return [
      {
        type: 'text',
        data: {
          text: '抖音找不到'
        }
      }
    ]
  }
}
async function getWeiboHot() {
  try {
    let url =
      "https://tenapi.cn/resou/";
    let message = await axios({ url: url, method: "get" }).then((res) => {
      console.log(res.data.list);
      let data = res.data.list;
      let msg = '微博热搜：'
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
    console.error('[weibo]', e)
    return [
      {
        type: 'text',
        data: {
          text: '微博走丢了'
        }
      }
    ]
  }
}
module.exports = {
  getZhihuHot,
  getDouyinHot,
  getWeiboHot
}
