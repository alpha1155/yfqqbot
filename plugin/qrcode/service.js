const fs = require('fs')
const path = require('path')
const os = require('os')
const axios = require('axios')
const { url } = require('inspector')
const sharp = require('sharp')

async function getImage(text) {
  return new Promise(async (resolve, reject) => {
    const filename = path.join(
      os.tmpdir(),
      `go_cqhttp_node_qrcode_${Date.now()}.svg`
    )
    const filenamePng = path.join(
      os.tmpdir(),
      `go_cqhttp_node_qrcode_${Date.now()}.png`
    )
    const urlGetQrcode = 'http://api.qrbtf.com/qrcode'
    await axios({
      method: 'GET',
      url: urlGetQrcode,
      params: {
        data: text,
        level: 'M',
        style: 'base',
        type: 'round',
        size: 50,
        opacity: 30,
        posType: 'planet',
        otherColor: '%23000000',
        posColor: '%23000000',
      },
    }).then(res => {
      let data = res.data.replaceAll('white', 'black').replaceAll('0.3', '0.9')
      fs.writeFile(filename, data, err => {
        if (err) {
          console.error(err)
          return
        }
        //文件写入成功。
      })
    })
    // res.body.pipe(stream)
    console.log(filename)
    const metadata = await sharp(filename, { animated: true }).metadata().catch(err => {
      console.error('[qrcode]', err)
    });
    console.log(metadata)
    await sharp(filename, { animated: true })
      .flatten({ background: '#ffffff' })
      .resize(300, 300)
      .png()
      .toFormat('png')
      .toFile(filenamePng)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error('[qrcode]', err)
      })
    resolve([
      {
        type: 'image',
        data: {
          file: 'file://' + filenamePng,
        },
      },
    ])
  })
}

module.exports = {
  getImage,
}
