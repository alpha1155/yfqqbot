const axios = require('axios')

const urlGetSexyPhoto = 'https://api.lolicon.app/setu/v2'

async function getSexyPhoto() {
	try {
		const res = await axios(urlGetSexyPhoto);
		const url = res.data.data[0].urls.original.split('cat')
		const file = url.join('re')
		const text = res.data.data[0].tags.join(' ')
		console.log(file, text);
		return [
			{
				type: 'image',
				data: {
					file
				}
			}
		]
	} catch (error) {
		ws.send('send_private_msg', {
			user_id: 2931470156,
			message: error
		})
		console.error('[anime]', error)
		return [
			{
				type: 'text',
				data: {
					text: '不可以涩涩，达咩达咩！！！'
				}
			}
		]
	}
}

module.exports = {
	getSexyPhoto
}
