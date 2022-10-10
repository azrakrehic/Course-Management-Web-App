const Sequelize = require('sequelize');
const sequelize = new Sequelize("wt2118605", "root", "password", {host:'localhost', dialect:"mysql", logging:true});
const db={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vjezba = require('./Vjezba.js')(sequelize);
db.zadatak = require('./Zadatak.js')(sequelize);
db.student = require('./Student.js')(sequelize);
db.grupa = require('./Grupa.js')(sequelize);

db.grupa.hasMany(db.student, {as:'grupaId'});
db.vjezba.hasMany(db.zadatak, {as:'vjezbaId'});

module.exports = db; 