function SummaryCard({ text, metadata }) {
	return (
		<div>
			<div>Backend Response:</div>
			<p>{text}</p>
			<p>{metadata.title}</p>
			<img src={metadata.thumbnail} alt="Video Thumbnail" width={300} />
		</div>
	);
}

export default SummaryCard;
