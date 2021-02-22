const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const marked = require('marked');
const sanitizeHtml = require('sanitize-html');

class Post extends Model {}

Post.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5],
			},
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [10],
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'post',
		hooks: {
			beforeCreate(newPostData) {
				newPostData.body = marked(sanitizeHtml(newPostData.body));
				return newPostData;
			},
			beforeUpdate(updatedPostData) {
				updatedPostData.body = marked(sanitizeHtml(updatedPostData.body));
				return updatedPostData;
			},
		},
	}
);

module.exports = Post;
