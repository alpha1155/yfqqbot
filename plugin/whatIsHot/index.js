const service = require('./service.js')

const WHITE_LIST_ZHIHU = ['zhihu', '知乎']
const WHITE_LIST_DOUYIN = ['douyin', '抖音']
const WHITE_LIST_WEIBO = ['微博', 'weibo']

module.exports = options => {
  return async ({ data, ws, http }) => {
    if (!data.message) {
      return
    }
    let message = data.message;
    if (WHITE_LIST_ZHIHU.includes(message)) {
      if (data.message_type === 'group') {
        ws.send('send_group_msg', {
          group_id: data.group_id,
          message: [
            {
              type: 'reply',
              data: {
                id: data.message_id
              }
            },
            ...(await service.getZhihuHot())
          ]
        })
        return
      }

      if (data.message_type === 'private') {
        ws.send('send_private_msg', {
          user_id: data.user_id,
          message: await service.getZhihuHot()
        })
      }

      return
    }
    if (WHITE_LIST_DOUYIN.includes(message)) {
      if (data.message_type === 'group') {
        ws.send('send_group_msg', {
          group_id: data.group_id,
          message: [
            {
              type: 'reply',
              data: {
                id: data.message_id
              }
            },
            ...(await service.getDouyinHot())
          ]
        })
        return
      }

      if (data.message_type === 'private') {
        ws.send('send_private_msg', {
          user_id: data.user_id,
          message: await service.getDouyinHot()
        })
      }

      return
    }

    if (WHITE_LIST_WEIBO.includes(message)) {
      if (data.message_type === 'group') {
        ws.send('send_group_msg', {
          group_id: data.group_id,
          message: [
            {
              type: 'reply',
              data: {
                id: data.message_id
              }
            },
            ...(await service.getWeiboHot())
          ]
        })
        return
      }

      if (data.message_type === 'private') {
        ws.send('send_private_msg', {
          user_id: data.user_id,
          message: await service.getWeiboHot()
        })
      }

      return
    }
    return

  }
}
