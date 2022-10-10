const app = require("./index");
const { assert } = require('chai');
let chai = require('chai');
let chaiHttp = require("chai-http");
const { expect } = chai;
const db = require("./modeli/wt2118605");
chai.assert;
chai.should();
chai.use(chaiHttp);

describe('Testovi za POST /student', function() {
        before(function(done) {
            db.sequelize.sync({force:true}).then(function(){
                done()
            })
        });

       it('Provjera da li se doda student', function(done) {
             chai.request("http://localhost:3000").post('/student').set('content-type','application/json').send({ime:"Azra",prezime:"Krehic",index:"18605",grupa:"RI3"}).end(function(err,res){
                res.should.have.status(200);
                done()
             })
        });

       it('Provjera da li se vrati odgovarajuci objekat', function(done) {
             chai.request("http://localhost:3000").post('/student').set('content-type','application/json').send({ime:"Lea",prezime:"Jesenkovic",index:"18699",grupa:"RI2"}).end(function(err,res){
                expect(res.body.status).to.equals("Kreiran student!");
                done()
             })
        });

       it('Provjera da li se vrati odgovarajuci objekat za studenta s istim indexom' , function(done) {
         chai.request("http://localhost:3000").post('/student').set('content-type','application/json').send({ime:"Amina",prezime:"Hamzic",index:"18605",grupa:"RI3"}).end(function(err,res){
                expect(res.body.status).to.equals("Student sa indexom 18605 već postoji!");
                done()
             })
       })

       it('Provjera da li se dodao odgovarajuci broj studenata' , function(done) {
                db.student.findAll().then((studenti) => {
                studenti.length.should.be.equal(2);
                done()
       })
            })

       it ('Provjera da se ne kreira grupa koja vec postoji', function(done) {
            chai.request("http://localhost:3000").post('/student').set('content-type','application/json').send({ime:"Amina",prezime:"Hamzic",index:"18609",grupa:"RI3"}).end(function(err,res){
            expect(res.body.status).to.equals("Kreiran student!");
            db.grupa.findAll().then((grupe) => {
                grupe.length.should.be.equal(2);
                done()
            })
       })
      })
   });

describe('Testovi za PUT /student:index', function() {
    it ('Provjera da li se vrati odgovarajuci status za promjenu grupe studenta', function(done) {
            chai.request("http://localhost:3000").put('/student/18609').set('content-type','application/json').send({grupa:"RI4"}).end(function(err,res){
            expect(res.body.status).to.equals("Promjenjena grupa studentu 18609");
            done()
      })
})

    it ('Provjera da li se vrati odgovarajuci status za index koji nema niti jedan student', function(done) {
       chai.request("http://localhost:3000").put('/student/18000').set('content-type','application/json').send({grupa:"RI2"}).end(function(err,res){
            expect(res.body.status).to.equals("Student sa indexom 18000 ne postoji");
            done()
        })
    })

    it ('Provjera da li se poveca broj grupa', function(done) {
            db.grupa.findAll().then((grupe) => {
                grupe.length.should.be.equal(3);
                done()
        })
    })
});


describe('Testovi za POST /batch/student', function() {
    it ('Provjera da li se vrati odgovarajuci status za dodana 2 nova studenta', function(done) {
            let string = "Sara,Pobric,18493,RI2\nLejla,Prses,19302,RI2";
            chai.request("http://localhost:3000").post('/batch/student').set('content-type','text/plain').send(string).end(function(err,res){
            expect(res.body.status).to.equals("Dodano 2 studenata!");
            done()
      })
})
    it ('Provjera da li se vrati odgovarajuci status za dodana 1 novog studenta (sa novom grupom) i jednog postojeceg', function(done) {
            let string = "Sara,Pobric,18493,RI2\nEmin,Dzanko,19999,RI8";
            chai.request("http://localhost:3000").post('/batch/student').set('content-type','text/plain').send(string).end(function(err,res){
            expect(res.body.status).to.equals("Dodano 1 studenata, a studenti {18493} već postoje!");
            done()
      })
})
    it ('Provjera da li se poveca broj grupa', function(done) {
            db.grupa.findAll().then((grupe) => {
                grupe.length.should.be.equal(4);
                done()
        })
    })

    it ('Provjera da li se vrati odgovarajuci status za dodana 1 novog studenta i 2 postojeca', function(done) {
            let string = "Sara,Sejic,18666,RI2\nEmin,Dzanko,19999,RI8\nSara,Pobric,18666,RI2";
            chai.request("http://localhost:3000").post('/batch/student').set('content-type','text/plain').send(string).end(function(err,res){
            expect(res.body.status).to.equals("Dodano 1 studenata, a studenti {19999,18666} već postoje!");
            done()
      })
})

});
