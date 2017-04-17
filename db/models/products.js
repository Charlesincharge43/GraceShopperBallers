'use strict'

const Sequelize = require('sequelize')



module.exports = db => db.define('product', {
	title: {
		type: Sequelize.STRING, 
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	inventory: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	category: {
		type: Sequelize.STRING, 
		allowNull: false
	},
	photo: {
		type: Sequelize.STRING,
		defaultValue: "http://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-basketball.png&w=288&h=288&transparent=true"
	}
})

