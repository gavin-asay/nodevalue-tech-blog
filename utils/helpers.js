module.exports = {
	articlePreview: text => {
		// shows only the first 30 words on the homepage to save space
		let preview = text.split(' ').slice(0, 30).join(' ');
		if (text.split(' ').length > 30) preview += ' ...';
		return preview;
	},
	format_date: date => `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`,
	format_time: date => `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}, ${new Date(date).getHours() || '00'}:${new Date(date).getMinutes()}`,
	removeTags: text => text.replace(/<.+?>/g, ''),
	renderLinebreaks: text => text.replace(/^.+\n|^.+$/gm, match => `<p>${match}</p>`),
};
