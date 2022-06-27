const service = require('./service')

const WHITE_LIST = ['翻译', 'fanyi', 'translate']

module.exports = options => {
  return async ({ data, ws, http }) => {
    if (!data.message) {
      return
    }

    const message = data.message.split('[')[0];
    const user_id = data.sender.user_id
    if (user_id != 2564531977) {
      return
    }

    if (message == null) {
      return
    }
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
          ...(await service.getCos(message))
        ]
      })
      return
    }

    if (data.message_type === 'private') {
      ws.send('send_private_msg', {
        user_id: data.user_id,
        message: await service.getCos()
      })
      return
    }
  }
}
