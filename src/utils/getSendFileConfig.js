export function getSendFileConfig(token, path) {
	return {
		headers: { Authorization: token },
		params: { path },
	}
}
