const service = require('./service')

const WHITE_LIST = ['天气']

module.exports = options => {
  return async ({ data, ws, http }) => {
    if (!data.message) {
      return
    }

    let message = data.message
    let mess = message.split('')
    if (mess[0]!=='天'||mess[1]!=='气') {
      return
    }
    let city = mess.slice(3,mess.length)
    city = city.join('')
    console.log(city)
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
          ...(await service.getCos(city))
        ]
      })
      return
    }

    if (data.message_type === 'private') {
      ws.send('send_private_msg', {
        user_id: data.user_id,
        message: await service.getCos(city)
      })
      return
    }
  }
}
