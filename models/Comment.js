const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const marked = require('marked');
const sanitizeHtml = require('sanitize-html');

class Comment extends Model {}

Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		comment_text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		user_id: {
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'user',
					key: 'id',
				},
			},
		},
		post_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'post',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'comment',
		hooks: {
			beforeCreate(newCommentData) {
				newCommentData.comment_text = sanitizeHtml(marked(newCommentData.comment_text));
				return newCommentData;
			},
			beforeUpdate(updatedCommentData) {
				updatedCommentData.comment_text = sanitizeHtml(marked(updatedCommentData.comment_text));
				return updatedCommentData;
			},
		},
	}
);

module.exports = Comment;
