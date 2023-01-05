const axios = require('axios')

const publicPath = 'https://tenapi.cn/wether/?city='

async function getCos(city) {
  try {


    // let url =
    // "http://api.muxiaoguo.cn/api/tianqi?api_key=af0fc6a85b69a59d&type=1&city=";
    let message = await axios({ url: publicPath + encodeURI(city), method: "get" }).then((res) => {
      console.log(res.data.data);
      let data = res.data.data;
      let msg =
        `${city}
日期：${data[0].date}
天气：${data[0].weather}
相对湿度：${data[0].humidity}
温度：${data[0].temp}
最高温度：${data[0].low}
最低温度：${data[0].high}
风级：${data[0].windLevel}
PM2.5指数：${data[0].pm25}
空气质量：${data[0].airQuality}

日期：${data[1].date}
天气：${data[1].weather}
相对湿度：${data[1].humidity}
最高温度：${data[1].low}
最低温度：${data[1].high}
风级：${data[1].windLevel}
PM2.5指数：${data[1].pm25}
空气质量：${data[1].airQuality}

日期：${data[2].date}
天气：${data[2].weather}
相对湿度：${data[2].humidity}
最高温度：${data[2].low}
最低温度：${data[2].high}
风级：${data[2].windLevel}
PM2.5指数：${data[2].pm25}
空气质量：${data[2].airQuality}

日期：${data[3].date}
天气：${data[3].weather}
相对湿度：${data[3].humidity}
最高温度：${data[3].low}
最低温度：${data[3].high}
风级：${data[3].windLevel}
PM2.5指数：${data[3].pm25}
空气质量：${data[3].airQuality}`;
      return msg
    });


    return [
      {
        type: 'text',
        data: {
          text: message
        }
      }
    ]
  } catch (e) {
    console.error('[mm]', e)
    return [
      {
        type: 'text',
        data: {
          text: '天气找不到'
        }
      }
    ]
  }
}

module.exports = {
  getCos
}
