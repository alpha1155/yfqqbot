const service = require('./service')

const pattern = /^(转字符|as(cii)?)+/i

module.exports = options => {
  return async ({ data, ws, http }) => {
    if (!data.message) {
      return
    }

    let message = data.message.trim()
    if (!pattern.test(message)) {
      return
    }


    let num_cols = message.replace(pattern, '').trim().split('\n')[1]
    let color = message.replace(pattern, '').trim().split('\n')[2]
    console.log(color, num_cols)
    color = color.split('[')[0]
    let tmp = message.replace(pattern, '').trim().split('url=')[1]
    let url = tmp.substr(0, tmp.length - 1);
    console.log(url)
    if (!url) {
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
          ...(await service.getImage(url, parseInt(num_cols), color))
        ]
      })
      return
    }

    if (data.message_type === 'private') {
      ws.send('send_private_msg', {
        user_id: data.user_id,
        message: await service.getImage(url, parseInt(num_cols), color)
      })
      return
    }
  }
}
