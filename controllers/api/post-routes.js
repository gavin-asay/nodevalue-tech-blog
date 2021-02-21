const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
		res.json(dbPostData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
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
		res.json(dbPostData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const dbPostData = await Post.create({
			title: req.body.title,
			body: req.body.body,
			// user_id: req.session.user_id,
			user_id: req.body.user_id,
		});

		res.json(dbPostData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.put('/:id', withAuth, async (req, res) => {
	try {
		const dbPostData = await Post.update(req.body, {
			where: { id: req.params.id },
		});

		if (!dbPostData) {
			res.status(404).json({ message: 'No post found with this id' });
			return;
		}
		res.json(dbPostData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.delete('/:id', withAuth, async (req, res) => {
	try {
		const dbPostData = await Post.destroy(req.body, {
			where: { id: req.params.id },
		});

		if (!dbPostData) {
			res.status(404).json({ message: 'No post found with this id' });
			return;
		}
		res.json(dbPostData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
