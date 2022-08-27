const LIST = require('../../data/data')
const service = require('./service')

const WHITE_LIST = ['MV', 'MM', 'MZ', '美女', '妹妹', '妹子']

module.exports = options => {
  return async ({ data, ws, http }) => {
    if (!data.message) {
      return
    }

    const message = data.message.toUpperCase().trim()
    if (!WHITE_LIST.includes(message)) {
      return
    }

    if (data.message_type === 'group') {
      if (LIST.whiteList.mm.indexOf(data.group_id) != -1) {
        console.log(LIST, data.group_id, LIST.whiteList.mm.indexOf(data.group_id))
        ws.send('send_group_msg', {
          group_id: data.group_id,
          message: [
            {
              type: 'reply',
              data: {
                id: data.message_id
              }
            },
            ...(await service.getCos())
          ]
        })
        return
      } else {
        return
      }

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
