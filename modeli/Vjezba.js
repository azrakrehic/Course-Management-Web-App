
const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
	const Vjezba = sequelize.define('vjezba', {
		id : {
			type: Sequelize.INTEGER,
			allowNull:false,
			primaryKey:true
		},
		naziv:Sequelize.STRING,
		zadaci:Sequelize.INTEGER
	});
	return Vjezba;
}