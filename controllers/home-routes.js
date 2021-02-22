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
	res.render('login', { year: new Date().getFullYear() });
});

router.get('/read-post/:id', async (req, res) => {
	try {
		const dbPostData = await Post.findOne({
			where: { id: req.params.id },
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
			res.status(404).json({ message: 'No post with this id' });
			return;
		}

		const post = dbPostData.get({ plain: true });
		console.log(post);
		res.render('single-post', { post, year: new Date().getFullYear(), loggedIn: req.session.loggedIn });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
