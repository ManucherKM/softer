// Utils
import axios from 'axios'

export async function sendFileToDisk(url, config, file) {
	try {
		// Waiting for a response from the API to get the URL to download the file.
		const resURL = await axios.get(url, config)

		// Send the file to the received URL and return the value returned from the API.
		return await axios.put(resURL.data.href, file)
	} catch (e) {
		// If an error occurs, we propagate it to a higher level so that it can be processed there.
		throw new Error('Не удалось загрузить файл', e)
	}
}
