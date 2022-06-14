const service = require('./service')

const WHITE_LIST_ZHIHU = ['zhihu', '知乎']
const WHITE_LIST_DOUYIN = ['douyin', '抖音']

module.exports = options => {
  return async ({ data, ws, http }) => {
    if (!data.message) {
      return
    }
    let message = data.message, zhihu = 0, douyin = 0;
    if (WHITE_LIST_ZHIHU.includes(message)) {
      zhihu = 1;
    }
    if (WHITE_LIST_DOUYIN.includes(message)) {
      douyin = 1;
    }
    function sendMessage (zhihu, douyin) {
      if (zhihu) {
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
      if (douyin) {
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
      return
    }
  }
}
