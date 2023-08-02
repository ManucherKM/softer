import { create } from 'zustand'

export const useStore = create(set => ({
	sendFiles: files => {
		const url = 'https://cloud-api.yandex.net/v1/disk/resources/upload'

		console.log(files)
	},
}))
