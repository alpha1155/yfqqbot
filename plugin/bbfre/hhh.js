
const axios = require('axios')

const publicPath = 'https://api.muxiaoguo.cn/api/meinvtu?api_key=fb06ed58f604f91b&num=1'

async function getCos() {
    try {
        let res = await axios(publicPath)
        const file = res.data.data[0].imgurl
        console.log(file)
        return [
            {
                type: 'image',
                data: {
                    file
                }
            }
        ]
    } catch (e) {
        console.error('[mm]', e)
        return [
            {
                type: 'text',
                data: {
                    text: '妹妹走丢了'
                }
            }
        ]
    }
}

module.exports = {
    getCos
}
