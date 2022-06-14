const WHITE_LIST = [ '周浩', '小丑']

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
      console.log('——————————————————')
      ws.send('send_group_msg', {
        group_id: data.group_id,
        message: [
          {
            type: 'reply',
            data: {
              id: data.message_id
            }
          },
          {
            type: 'image',
            data:{
              // file:'/data/images/dyh/R-C.jpg',
              file:'https://img.zcool.cn/community/018a075e1bbcf3a80120a895be57c6.jpg@1280w_1l_2o_100sh.jpg',

            }
          },     
          {
            type: 'text',
            data: {
              text: '小丑是吧'
            }
          }
        ]
      })
      console.log('——————————————————')
      return
    }

    if (data.message_type === 'private') {
      ws.send('send_private_msg', {
        user_id: data.user_id,
        message: [
          {
          type: 'image',
          data:{
            file:'https://img.zcool.cn/community/018a075e1bbcf3a80120a895be57c6.jpg@1280w_1l_2o_100sh.jpg',}
          
        },          
        {
          type: 'text',
          data: {
            text: '小丑是吧'
          }
        
      }]})
      return
    }
  }
}
