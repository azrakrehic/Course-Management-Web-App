
const db = require('./modeli/wt2118605.js');
db.sequelize.sync({force:true}).then(function(){
        console.log("Gotovo kreiranje tabela!");
        process.exit();
});
