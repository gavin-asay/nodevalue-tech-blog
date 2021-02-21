const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
	try {
		const dbUserData = await User.findAll({
			attributes: {
				exclude: ['password'],
			},
		});

		if (!dbUserData) {
			res.status(404).json({ message: 'No users found' });
			return;
		}
		res.json(dbUserData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		console.log(req);
		const dbUserData = await User.create({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
		});

		console.log(dbUserData);

		req.session.save(() => {
			req.session.user_id = dbUserData.id;
			req.session.username = dbUserData.username;
			req.session.loggedIn = true;

			res.json(dbUserData);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.put('/:id', withAuth, async (req, res) => {
	try {
		const dbUserData = await User.update(req.body, {
			individualHooks: true,
			where: {
				id: req.params.id,
			},
		});

		if (!dbUserData[0]) {
			res.status(404).json({ message: 'No user found with this id' });
			return;
		}
		res.json(dbUserData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.delete('/:id', withAuth, async (req, res) => {
	try {
		const dbUserData = await User.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!dbUserData) {
			res.status(404).json({ message: 'No user found with this id' });
		}
		res.json(dbUserData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const dbUserData = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!dbUserData) {
			res.status(404).json({ message: 'No user with that email address' });
			return;
		}

		const validPassword = await dbUserData.checkPassword(req.body.password);
		if (!validPassword) {
			res.status(400).json({ message: 'Incorrect password' });
			return;
		}

		req.session.save(() => {
			req.session.user_id = dbUserData.id;
			req.session.username = dbUserData.username;
			req.session.loggedIn = true;

			res.json({ user: dbUserData, message: 'Logged in successfully' });
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/logout', withAuth, async (req, res) => {
	if (req.session.loggedin) req.session.destroy(() => res.status(204).end());
	else res.status(404).end();
});

module.exports = router;
