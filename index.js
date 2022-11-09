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
const schedule1 = require('./schedule')
ws.listen(data => {
  if (process.env.NODE_ENV === 'development') {
    console.log(data)
  }






  plugins.forEach(plugin => plugin({ data, ws, http }));



})


const schedule = require('node-schedule');
const map = { 9: 31, 10: 30, 11: 31 }
function reData() {
  let deadlines = {
    cet6: null,
    masterExam: null
  }
  let nowDate = new Date();
  switch (nowDate.getMonth()) {
    case 9:
      deadlines.cet6 = 70 - nowDate.getDate();
      deadlines.masterExam = 84 - nowDate.getDate();
      break;
    case 10:
      deadlines.cet6 = 39 - nowDate.getDate();
      deadlines.masterExam = 53 - nowDate.getDate();
      break;
    case 11:
      deadlines.cet6 = 9 - nowDate.getDate();
      deadlines.masterExam = 23 - nowDate.getDate();
      break;
    default:
      break;
  }
  return deadlines;
}

let rule = new schedule.RecurrenceRule();
rule.hour = [8, 22];
rule.minute = 0;
rule.second = 0;
function send() {
  let deadlines = reData()
  // ws.send('send_private_msg', {
  //   user_id: 2931470156,
  //   message: [

  //     {
  //       type: 'text',
  //       data: {
  //         text: `距六级考试还有${deadlines.cet6}天\n距研究生招生考试还有${deadlines.masterExam}天`
  //       }
  //     }
  //   ]
  // })
  ws.send('send_group_msg', {
    group_id: 1019336961,
    message: [

      {
        type: 'text',
        data: {
          text: `距六级考试还有${deadlines.cet6}天\n距研究生招生考试还有${deadlines.masterExam}天`
        }
      }
    ]
  })
}
let job = schedule.scheduleJob(rule, () => {
  send()
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
app.post('/sendpicture', async (req, res) => {
  console.log(req.body)
  console.log('------------------------------------------------------')
  ws.send('send_private_msg', {
    user_id: 2931470156,
    message: await service.getSexyPhoto(ws),
  })
  res.send('hello world')
})
app.get('/sendpicture', async (req, res) => {
  console.log(req.body)
  console.log('------------------------------------------------------')
  ws.send('send_private_msg', {
    user_id: 2931470156,
    message: await service.getSexyPhoto(ws),
  })
  res.send('hello world')
})
