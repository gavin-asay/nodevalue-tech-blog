async function commentSubmit(e) {
	e.preventDefault();
	let comment_text = document.querySelector('textarea[name="comment-text"]').value;

	if (!comment_text) return;

	const response = await fetch('/api/comments/', {
		method: 'POST',
		body: JSON.stringify({
			comment_text,
			post_id: document.location.toString().split('/').reverse()[0],
		}),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		comment_text = '';
		document.location.reload();
	} else alert(response.statusText);
}

document.querySelector('#comment-submit').addEventListener('click', commentSubmit);
