const req = require('express/lib/request')
const { ws, http } = require('./bot')
// const { gitHook } = require('./hook')
const config = require('./config')
const shell = require('shelljs')
const service = require('./plugin/anime/service')
const { createApp } = require('./develop')
const app = createApp(7700)
const plugins = Object.keys(config.plugin).map(name =>
  require(name)(config.plugin[name] || {})
)

ws.listen(data => {
  if (process.env.NODE_ENV === 'development') {
    console.log(data)
  }

  plugins.forEach(plugin => plugin({ data, ws, http }))
})

app.post('/githook', async (req, res) => {
  console.log(req.body)
  console.log('------------------------------------------------------')
  ws.send('send_private_msg', {
    user_id: 2931470156,
    message: await service.getSexyPhoto(ws),
  })
  try {
    if (shell.exec('git pull').code !== 0) {
      shell.echo('Error: Git pull failed')
      shell.exit(1)
    }
  } catch (error) {
    console.error(error)
    ws.send('send_private_msg', {
      user_id: 2931470156,
      message: [{
        type: 'text',
        data: {
          text: error
        }
      }],
    })
  }
  res.send('hello world')
})
