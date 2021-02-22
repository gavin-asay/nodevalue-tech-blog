const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
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
		res.render('dashboard', { posts, loggedIn: req.session.loggedIn, year: new Date().getFullYear() });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/edit-post/:id', withAuth, async (req, res) => {
	const dbPostData = await Post.findOne({
		where: {
			id: req.params.id,
		},
	});

	const post = dbPostData.get({ plain: true });
	res.render('edit-post', { post, year: new Date().getFullYear(), loggedIn: req.session.loggedIn });
});

router.get('/create-post/', withAuth, async (req, res) => {
	res.render('create-post', { year: new Date().getFullYear(), loggedIn: req.session.loggedIn });
});

module.exports = router;
