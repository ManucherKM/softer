// Components
import { Input } from '@/components/Input/Input'
import { UploadFile } from '@/components/UploadFile/UploadFile'

// Utils
import { useEffect, useState } from 'react'
import { useStore } from '@/store'

export const App = () => {
	// Checking to see if the old token is there.
	const prevToken = useStore(state => state.token)

	// The state for the user token. We add either the old token or an empty string to the state.
	const [token, setToken] = useState(prevToken || '')

	// Handler for the user's token.
	function tokenHandler(e) {
		setToken(e.target.value)
	}

	// A function to update a token in the store.
	const updateToken = useStore(state => state.updateToken)

	// Tracking the change in the token.
	useEffect(() => {
		// Check if there is anything in the "token" variable.
		if (token.trim()) {
			// Updating the token.
			updateToken(token)
		}
	}, [token])

	return (
		<>
			<UploadFile />
			<Input placeholder="token" value={token} onChange={tokenHandler} />
		</>
	)
}
