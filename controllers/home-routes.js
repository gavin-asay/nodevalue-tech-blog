const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
	try {
		const dbPostData = await Post.findAll({
			attributes: ['id', 'title', 'body', 'created_at'],
			order: [['created_at', 'DESC']],
			include: [
				{
					model: User,
					attributes: ['username'],
				},
				{
					model: Comment,
					attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
					include: {
						model: User,
						attributes: ['username'],
					},
				},
			],
		});

		if (!dbPostData) {
			res.status(404).json({ message: 'No posts found' });
			return;
		}

		const posts = dbPostData.map(post => post.get({ plain: true }));
		res.render('homepage', { posts, loggedIn: req.session.loggedIn, year: new Date().getFullYear() });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/login', async (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('login');
});

module.exports = router;
