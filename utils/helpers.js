module.exports = {
	articlePreview: text => {
		let preview = text.split(' ').slice(0, 50).join(' ');
		if (text.split(' ').length > 50) preview += ' ...';
		return preview;
	},
};
