async function editPost(e) {
	e.preventDefault();

	const updatedBody = document.querySelector('#edit-post').value;
	const id = document.location.toString().split('/').reverse()[0];

	const response = await fetch(`/api/posts/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ body: updatedBody }),
		headers: { 'Content-Type': 'application/json' },
	});

	// if (response.ok) document.location.replace('/dashboard');
	// else alert(response.status, response.statusText);
}

async function deletePost(e) {
	e.preventDefault();

	const id = document.location.toString().split('/').reverse()[0];
	console.log(id);

	const response = await fetch(`/api/posts/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });

	if (response.ok) document.location.replace('/dashboard');
	else alert(response.status, response.statusText);
}

document.querySelector('#submit').addEventListener('click', editPost);
document.querySelector('#delete').addEventListener('click', deletePost);
