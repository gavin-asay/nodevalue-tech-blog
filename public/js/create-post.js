async function postSubmitHandler(e) {
	e.preventDefault();

	const title = document.querySelector('#new-title').value.trim();
	const body = document.querySelector('#create-post').value;

	if (!title || !body) {
		while (document.querySelector('.error-message')) document.querySelector('.error-message').remove();
		let errMsg = document.createElement('p');
		errMsg.textContent = 'Title and body are required.';
		errMsg.className = 'error-message';
		document.querySelector('#new-post').appendChild(errMsg);
		return;
	}

	const response = await fetch('/api/posts', {
		method: 'POST',
		body: JSON.stringify({ title, body }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) document.location.replace('/dashboard');
	else alert(response.statusText);
}

document.querySelector('#new-post').addEventListener('submit', postSubmitHandler);
