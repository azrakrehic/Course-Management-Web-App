const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const path = require('path');
const url = require('url');
const db = require('./modeli/wt2118605.js');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname, '/public/html')));
app.use('/', express.static(path.join(__dirname, '/public/css')));
app.use('/', express.static(path.join(__dirname, '/public/js')));
app.use('/', express.static(path.join(__dirname, '/public/images')));
app.use('/', express.static(path.join(__dirname, '/public')));
app.get('/vjezbe/', (req, res) => { 
    let objekat = {
                brojVjezbi: 0, brojZadataka:[]
            };
            let niz = []; 
       db.vjezba.findAll().then((vjezbe) => {
        objekat.brojVjezbi = vjezbe.length;
        objekat.brojZadataka = new Array(vjezbe.length).fill(0);
        for (let i = 0;i< objekat.brojVjezbi; i++) {
            objekat.brojZadataka[i]=vjezbe[i].zadaci;
        }
       res.status(200).json(objekat);
       });
       
    }); 



app.post('/vjezbe/', function (req, res) {
    let tijelo = req.body;
    var greska="Pogrešan parametar";
    let pogresno = false;
    let zadaci = tijelo['brojZadataka'];
    let vjezbe = tijelo['brojVjezbi'];
    if (vjezbe<1 || vjezbe > 15) {
        greska = greska + " brojVjezbi";
        pogresno=true;
    }
    if (vjezbe!=zadaci.length) {
        if (pogresno) greska = greska + ",";
        greska = greska + " brojZadataka";
        pogresno=true;
    }
    for (let i = 0; i<zadaci.length; i++) {
        if (zadaci[i]<0 || zadaci[i]>10){
            if (pogresno) greska = greska + ",";
            greska = greska + " z" +i;
            pogresno=true;
        }
    }
    if (pogresno) {
        res.status(200).json({status:"error", data:greska});
    }
    else {
        let nizVjezbePromise = [];
        db.zadatak.destroy({
            where:{}
        }).then(() => {
            db.vjezba.destroy({
                where:{}
            }).then(() => {
                for (let i=0; i<vjezbe; i++) {
                    let nizZadaciPromise = [];
                    for (let j=0;j<zadaci[i];j++){
                        nizZadaciPromise.push(db.zadatak.create({
                            naziv: "ZADATAK"+(j+1)
                        }));
                    }
                    Promise.all(nizZadaciPromise).then((nizZadaci) => {
                        nizVjezbePromise.push(db.vjezba.create({
                            id: i+1,
                            naziv:"VJEZBA"+(i+1),
                            zadaci:zadaci[i]
                        }).then((v) => {
                            return v.setVjezbaId(nizZadaci).then(() => {
                                return new Promise((resolve, reject) => {
                                    resolve(v);
                                })
                            })
                        }))
                    })
                }
            });
        });
    }
});

app.post('/student', function(req,res) {
    let tijelo = req.body;
    let novoIme = tijelo['ime'];
    let NovoPrezime = tijelo['prezime'];
    let noviIndex = tijelo['index'];
    let NovaGrupa = tijelo['grupa'];
    let id;
    db.student.findOrCreate({
        where: {index: noviIndex},
        defaults: {
                ime: novoIme,
                prezime: NovoPrezime,
                grupa: NovaGrupa,
        }
    }).then(([student,kreiran]) => {
        let objekat={status:""};
        if (kreiran) {
            db.grupa.findOrCreate({
                where:{naziv:NovaGrupa},
                defaults:{}
            }).then(([g,kreirana])=> {
                    db.student.findAll({where:{grupa:NovaGrupa}}).then((studenti) => {
                        g.setGrupaId(studenti);
                    })   
            })
            objekat.status="Kreiran student!";
        }
        else {
            objekat.status='Student sa indexom ' + noviIndex + ' već postoji!';
        }
        res.status(200).json(objekat);
    })
})

app.put('/student/:index', function(req,res) {
    let tijelo = req.body;
    let nazivGrupe = tijelo['grupa'];
    let objekat = {status:""};
    db.student.findOne({where:{index:req.params.index}}).then((s) => {
        if (s==null) {
            objekat.status="Student sa indexom " + req.params.index + " ne postoji";
        }
        else {
            db.grupa.findOrCreate({
                where:{naziv:nazivGrupe},
                defaults:{}
            }).then(([g,kreirana])=> {
                db.student.update(
                    {grupa:nazivGrupe},
                    {where:{index:req.params.index}}).then((st) => {
                        db.student.findAll({where:{grupa:nazivGrupe}}).then((studenti) => {
                            g.setGrupaId(studenti);
                        })   
                    })
            })
            objekat.status = "Promjenjena grupa studentu " + req.params.index;
        }
        res.status(200).json(objekat);
    }) 
})

app.post('/batch/student', function(req,res) {
    let studenti1 = req.body.split('\n');
    var pomocniStudenti = [];
    for (let i=0;i<studenti1.length;i++) {
        var podatak = studenti1[i].split(',');
        pomocniStudenti.push(podatak[2]); //niz svih proslijedjenih indexa
    }
    var niz1 = [];  
    let niz = new Array(studenti1.length).fill(0);
    for (let i = 0 ; i<studenti1.length; i++) {
        niz1[i] = studenti1[i].split(','); //matrica studenata
    }
    var k = 0;
        for (let i = 0;i<niz1.length; i++) {
        for(let j = i+1; j<niz1.length;j++){
            if (niz1[i][2]==niz1[j][2]){
                if (studenti1.length>1){ //samo ako imamo vise od jednog studenta
                studenti1.splice((j-k),1); //izbacujemo studente sa ponavljajucim indexom
                    k++; //koliko smo obrisali studenata iz pocetnog niza
                    niz[j]=1; //studenti koji nisu dodani jer su imali isti index 
                }
            }
        }
    }  
    var vecUpisani = [];
     db.student.findAll().then((studenti)=> {
        for (let i=0;i<studenti.length;i++) {
            for (let j=0;j<pomocniStudenti.length;j++) {
                if (pomocniStudenti[j]==studenti[i].index) { //pronalazimo sve indexe koji su vec u bazi
                    niz[j]=1; //studenti koji nisu dodani jer im je index vec u bazi
                }
            }
        }
        for(let l=0;l<niz.length;l++) {
        if(niz[l]==1) { //ako je student dupli ili vec u bazi
            vecUpisani.push(pomocniStudenti[l]); //dodaj ga u niz vecupisanih
        }
     }
    
    })
  
    
    let m = studenti1.length; //da mozemo provjeriti da li su svi studenti koji su preostali kreirani
    for (let i = 0 ;i<studenti1.length;i++){
        let podaci = studenti1[i].split(',');
        db.student.findOrCreate({ //kreiramo studenta ako ne postoji u bazi
            where: {index: podaci[2].toString()},
            defaults: {
                ime: podaci[0].toString(),
                prezime: podaci[1].toString(),
                grupa: podaci[3].toString(),
            }
        }).then(([student,kreiran]) => {
            let objekat={status:""};
            if (!kreiran) { //ako je student postojao u bazi
                objekat.status="Dodano " + (pomocniStudenti.length-vecUpisani.length) + " studenata, a studenti {" + vecUpisani.join(',') + "} već postoje!"; //status ce imati postojece indexe
                if (i==studenti1.length-1) res.status(200).json(objekat); //ako smo dosli do kraja niza vrati status
            }
            else if (kreiran) {
                m--;
                if (i==studenti1.length-1 && vecUpisani.length!=0) { //ako smo dosli do kraja niza a postojali su neki indexi 
                    objekat.status="Dodano " + (pomocniStudenti.length-vecUpisani.length) + " studenata, a studenti {" + vecUpisani.join(',') + "} već postoje!";
                    res.status(200).json(objekat);
                }
                else if(m==0) { //ako su svi indexi novi
                    objekat.status = "Dodano " + studenti1.length + " studenata!";
                    res.status(200).json(objekat);
                }
                db.grupa.findOrCreate({
                    where:{naziv:podaci[3].toString()},
                    defaults:{}
                }).then(([g,kreirana])=> {
                    db.student.findAll({where:{grupa:podaci[3].toString()}}).then((studenti) => {
                        g.setGrupaId(studenti);
                    })
                })
            }
        })
    }   
})
app.listen(3000);