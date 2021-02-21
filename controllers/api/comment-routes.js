const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
	try {
		const dbCommentData = await Comment.findAll({
			order: ['created_at', 'DESC'],
			include: {
				model: User,
				attributes: ['username'],
			},
		});

		if (!dbCommentData) {
			res.status(404).json({ message: 'No comments found' });
			return;
		}
		const comments = dbCommentData.map(comment => comment.get({ plain: true }));
		res.json(comments);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/', withAuth, async (req, res) => {
	try {
		const dbCommentData = await Comment.create({
			comment_text: req.body.comment_text,
			post_id: req.body.post_id,
			user_id: req.session.user_id,
		});

		res.json(dbCommentData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.delete('/:id', withAuth, async (req, res) => {
	try {
		const dbCommentData = await Comment.destroy({
			where: {
				id: req.params.id,
			},
		});

		res.json(dbCommentData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
