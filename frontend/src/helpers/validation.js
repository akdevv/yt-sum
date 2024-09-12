export const isValidURL = (url) => {
	const validUrlRegex =
		/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})$/;
	return validUrlRegex.test(url);
};
