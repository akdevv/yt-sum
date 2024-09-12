function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="text-center py-4">
			<a
				href="https://github.com/akdevv"
				target="_blank"
				className="font-fira-mono text-blue-400 transition-colors duration-300 hover:text-blue-300"
			>
				@akdevv
			</a>
			<p className="text-sm mt-2 font-poppins text-gray-500">
				&copy; {currentYear} yt-sum. All rights reserved.
			</p>
		</footer>
	);
}

export default Footer;
