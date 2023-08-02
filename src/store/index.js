import { create } from 'zustand'

export const useStore = create(set => ({
	sendFiles: files => {
		console.log(files)
	},
}))
