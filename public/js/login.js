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
				while (document.querySelector('.error-message')) document.querySelector('.error-message').remove();
				const errorMsg = document.createElement('p');
				errorMsg.textContent = 'Incorrect email or password. Please try again.';
				errorMsg.className = 'error-message';
				document.querySelector('#login').appendChild(errorMsg);
			} else document.location.replace('/');
		} catch (err) {
			while (document.querySelector('.error-message')) document.querySelector('.error-message').remove();
			const errorMsg = document.createElement('p');
			errorMsg.textContent = err;
			errorMsg.className = 'error-message';
			document.querySelector('#login').appendChild(errorMsg);
		}
	} else {
		while (document.querySelector('.error-message')) document.querySelector('.error-message').remove();
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

	if (username && email && password) {
		if (password.length < 8) {
			while (document.querySelector('.error-message')) document.querySelector('.error-message').remove();
			const errorMsg = document.createElement('p');
			errorMsg.textContent = 'Password must be at least 8 characters.';
			errorMsg.className = 'error-message';
			document.querySelector('#login').appendChild(errorMsg);
			return;
		}

		try {
			const response = await fetch('/api/users/', {
				method: 'POST',
				body: JSON.stringify({ username, email, password }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) document.location.replace('/');
			else {
				const err = await response.json();

				if (err.errors[0].type === 'unique violation') {
					while (document.querySelector('.error-message')) document.querySelector('.error-message').remove();
					const errorMsg = document.createElement('p');
					errorMsg.textContent = `This ${err.errors[0].path.split('.')[1]} is already in use. Please choose a different ${err.errors[0].path.split('.')[1]}.`;
					errorMsg.className = 'error-message';
					document.querySelector('#register').appendChild(errorMsg);
				} else {
					while (document.querySelector('.error-message')) document.querySelector('.error-message').remove();
					const errorMsg = document.createElement('p');
					errorMsg.textContent = err.errors[0].message;
					errorMsg.className = 'error-message';
					document.querySelector('#register').appendChild(errorMsg);
				}
			}
		} catch (err) {
			while (document.querySelector('.error-message')) document.querySelector('.error-message').remove();
			const errorMsg = document.createElement('p');
			errorMsg.textContent = err;
			errorMsg.className = 'error-message';
			document.querySelector('#register').appendChild(errorMsg);
		}
	} else {
		while (document.querySelector('.error-message')) document.querySelector('.error-message').remove();
		const errorMsg = document.createElement('p');
		errorMsg.textContent = 'Please enter a valid username, email, and password.';
		errorMsg.className = 'error-message';
		document.querySelector('#register').appendChild(errorMsg);
	}
}

document.querySelector('#login').addEventListener('submit', loginFormHandler);
document.querySelector('#register').addEventListener('submit', registerFormHandler);
