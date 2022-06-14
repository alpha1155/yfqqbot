const WHITE_LIST = ['dyh', 'DYH', '邓亚辉', '帅哥', 'GG']

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
              file:'https://tse1-mm.cn.bing.net/th/id/R-C.5566455cf981b6ff1701619726744111?rik=7pBU7ZKcQnM0PA&riu=http%3a%2f%2fimg0.selfimg.com.cn%2fGQgalleryLowerrightWatermarkB%2f2016%2f05%2f03%2f1462290721_3wUttr.jpg&ehk=tXe6xKR4HhEhx047XKasoc7LDRK3ouUlEQwoe9b7ONg%3d&risl=&pid=ImgRaw&r=0',

            }
          },     
          {
            type: 'text',
            data: {
              text: '看看帅哥放松放松'
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
            file:'https://tse1-mm.cn.bing.net/th/id/R-C.5566455cf981b6ff1701619726744111?rik=7pBU7ZKcQnM0PA&riu=http%3a%2f%2fimg0.selfimg.com.cn%2fGQgalleryLowerrightWatermarkB%2f2016%2f05%2f03%2f1462290721_3wUttr.jpg&ehk=tXe6xKR4HhEhx047XKasoc7LDRK3ouUlEQwoe9b7ONg%3d&risl=&pid=ImgRaw&r=0',}
          
        },          
        {
          type: 'text',
          data: {
            text: '看看帅哥放松放松'
          }
        
      }]})
      return
    }
  }
}
