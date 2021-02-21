async function loginFormHandler(e) {
	e.preventDefault();

	const email = document.querySelector('input[name="email-login"]').value.trim();
	const password = document.querySelector('input[name="password-login"]').value.trim();

	if (email && password) {
		try {
			const response = await fetch('/api/users/login', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!response.ok) {
				document.querySelector('.error-message').remove();
				const errorMsg = document.createElement('p');
				errorMsg.textContent = 'Incorrect email or password. Please try again.';
				errorMsg.className = 'error-message';
				document.querySelector('#login').appendChild(errorMsg);
			} else document.location.replace('/');
		} catch (err) {
			document.querySelector('.error-message').remove();
			const errorMsg = document.createElement('p');
			errorMsg.textContent = err;
			errorMsg.className = 'error-message';
			document.querySelector('#login').appendChild(errorMsg);
		}
	} else {
		document.querySelector('.error-message').remove();
		const errorMsg = document.createElement('p');
		errorMsg.textContent = 'Please enter a valid email and password.';
		errorMsg.className = 'error-message';
		document.querySelector('#login').appendChild(errorMsg);
	}
}

async function registerFormHandler(e) {
	e.preventDefault();

	const username = document.querySelector('input[name="username-register"]').value.trim();
	const email = document.querySelector('input[name="email-register"]').value.trim();
	const password = document.querySelector('input[name="password-register"]').value.trim();
	console.log(username, email, password);

	if (username && email && password) {
		try {
			const response = await fetch('/api/users/', {
				method: 'POST',
				body: JSON.stringify({ username, email, password }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!response.ok) {
				document.querySelector('.error-message').remove();
				const errorMsg = document.createElement('p');
				errorMsg.textContent = 'Account creation failed';
				errorMsg.className = 'error-message';
				document.querySelector('#register').appendChild(errorMsg);
			} else document.location.replace('/');
		} catch (err) {
			document.querySelector('.error-message').remove();
			const errorMsg = document.createElement('p');
			errorMsg.textContent = err;
			errorMsg.className = 'error-message';
			document.querySelector('#register').appendChild(errorMsg);
		}
	} else {
		document.querySelector('.error-message').remove();
		const errorMsg = document.createElement('p');
		errorMsg.textContent = 'Please enter a valid username, email, and password.';
		errorMsg.className = 'error-message';
		document.querySelector('#register').appendChild(errorMsg);
	}
}

document.querySelector('#login').addEventListener('submit', loginFormHandler);
document.querySelector('#register').addEventListener('submit', registerFormHandler);
