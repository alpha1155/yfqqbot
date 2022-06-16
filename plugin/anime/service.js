const axios = require('axios')

const urlGetSexyPhoto = 'https://api.lolicon.app/setu/v2'

async function getSexyPhoto () {
	try {
		const res = await axios(urlGetSexyPhoto);
		const file = res.data.data[0].urls.original
		const text = res.data.data[0].tags.join(' ')
		return [
			{
				type: 'image',
				data: {
					file
				}
			},
			{
				type: 'text',
				data: {
					text
				}
			}
		]
	} catch (error) {
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
