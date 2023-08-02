// Utils
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getSendFileConfig } from '@/utils/getSendFileConfig'
import { sendFileToDisk } from '@/utils/sendFileToDisk'

// Creating storage
export const useStore = create(
	// We pass our storage to the presist function so that when the page reloads, the user will still have their data.
	persist(
		// We take 2 parameters in our storage function, "set" to change the storage and "get" to get data from our storage.
		(set, get) => ({
			// Token from our Yandex app.
			token: '',
			// Function to update the user's token.
			updateToken: token => set(() => ({ token })),
			// Function for sending files to Yandex disk.
			sendFiles: async files => {
				try {
					// Retrieve the user token from the store.
					const { token } = get()

					// If there is no token, return false.
					if (token.length === 0) return false

					// URL to get the url to download the file.
					const url = 'https://cloud-api.yandex.net/v1/disk/resources/upload'

					// A variable for storing promises.
					const results = []

					// We loop through the files received from the user.
					for (const file of files) {
						// Generate config for correct work with API.
						const config = getSendFileConfig(token, 'test/' + file.name)

						// We add the promis to the result variable.
						results.push(sendFileToDisk(url, config, file))
					}

					// Waiting for all the promises to be fulfilled.
					await Promise.all(results)

					// If all was successful - return true.
					return true
				} catch (e) {
					// Output the error to the console.
					console.error(e)
					// If an error occurs - return false.
					return false
				}
			},
		}),
		{
			// The name of our store in localStorage.
			name: 'store',
		},
	),
)
