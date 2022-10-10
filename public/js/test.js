let assert = chai.assert;
let should = chai.should();

describe('Testovi', function() {
    beforeEach(function() {
        this.xhr = sinon.useFakeXMLHttpRequest();

        this.requests = [];
        this.xhr.onCreate = function(xhr) {
            this.requests.push(xhr);
        }.bind(this);
    });

    afterEach(function() {
        this.xhr.restore();
    });

    describe('VjezbeAjax dodajInputPolja testovi', function() {
       it('Provjera da li dodajInputPolja dodaje dovoljan broj input polja', function() {
                var divVjezbe = document.createElement("div");
                VjezbeAjax.dodajInputPolja(divVjezbe,3); 
                assert.equal(divVjezbe.childElementCount, 6, "Nije dovoljan broj input polja"); //6 jer se uz svako input polje dodaje prazan red kao child
        });
      
       it ('Provjera da li dodajInputPolja dodaje odgovarajuce pocetne vrijednosti u polja', function() {
                var divVjezbe = document.createElement("div");
                VjezbeAjax.dodajInputPolja(divVjezbe,3);
                for (let i = 1; i< divVjezbe.childElementCount; i++) {
                        if (divVjezbe.childNodes[i].id=="z"+(i-1)) //provjerava samo input polja i njihove vrijednosti
                        assert.equal(divVjezbe.childNodes[i].value, 4, "Value polja inputa nisu ok!");
                }
       });
   });

    describe('VjezbeAjax iscrtajVjezbe testovi', function() {
        it ('Provjera da li se iscrta dovoljan broj vjezbi i divova za zadatke', function() {
            var divVjezbe = document.createElement("div");
            var podaci = {brojVjezbi:4, brojZadataka:[1,2,3,4]};
            VjezbeAjax.iscrtajVjezbe(divVjezbe, podaci);
            assert.equal(divVjezbe.childElementCount, 8, "Fali ili dugme za vjezbu ili div za zadatke");
        });
        it ('Provjera da li je id uredu', function() {
            var divVjezbe = document.createElement("div");
            var podaci = {brojVjezbi:4, brojZadataka:[1,2,3,4]};
            VjezbeAjax.iscrtajVjezbe(divVjezbe, podaci);
            var j = 1;
            for (let i=0; i<divVjezbe.childElementCount; i+=2) {
                assert.equal(divVjezbe.childNodes[i].id, "vjezba" + j++, "Id za dugme vjezba nije odgovarajuci.");  
            }
        });
        it ('Provjera da li je div prazan kada nije jednak brojVjezbi i duzina brojZadataka', function()  {
             var divVjezbe = document.createElement("div");
            var podaci = {brojVjezbi:5, brojZadataka:[1,2,3,4]};
            VjezbeAjax.iscrtajVjezbe(divVjezbe, podaci);
            assert.equal(divVjezbe.childElementCount, 0, "Iscratava se iako su pogresni parametri");
        });

        it ('Provjera da li je div prazan kada je brojVjezbi preko 15', function()  {
             var divVjezbe = document.createElement("div");
            var podaci = {brojVjezbi:17, brojZadataka:[1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7]};
            VjezbeAjax.iscrtajVjezbe(divVjezbe, podaci);
            assert.equal(divVjezbe.childElementCount, 0, "Iscratava se iako su pogresni parametri");
        });

        it ('Provjera da li je div prazan kada je brojZadataka preko 10', function()  {
             var divVjezbe = document.createElement("div");
            var podaci = {brojVjezbi:2, brojZadataka:[1,12]};
            VjezbeAjax.iscrtajVjezbe(divVjezbe, podaci);
            assert.equal(divVjezbe.childElementCount, 0, "Iscratava se iako su pogresni parametri");
        });
    });

 

   describe('VjezbeAjax posaljiPodatke testovi', function() {
    it ('Ispravan rad posaljiPodatke bez errora', function() {
          var podaci = {brojVjezbi:5, brojZadataka:[1,2,3,4,5]};
          VjezbeAjax.posaljiPodatke(podaci, (err,data)=> {
            assert.deepEqual(JSON.parse(data), podaci, "Error koji se ne bi trebao pojaviti!");
          });
    });

    it ('Ispravan rad posaljiPodatke sa errorom (brojZadataka veci od 10)', function() {
         var podaci = {brojVjezbi:5, brojZadataka:[1,2,14,4,5]};
         VjezbeAjax.posaljiPodatke(podaci, (err, data) => {
            assert.equal(err, !null, "Treba biti greska");
            assert.equal(data,null, "Data nije null");
         });
    });

    it ('Ispravan rad posaljiPodatke sa errorom (brojZadataka manji od 0)', function() {
         var podaci = {brojVjezbi:5, brojZadataka:[1,2,-2,4,5]};
         VjezbeAjax.posaljiPodatke(podaci, (err, data) => {
            assert.equal(err, !null, "Treba biti greska");
            assert.equal(data,null, "Data nije null");
         });
    });

    it ('Ispravan rad posaljiPodatke sa errorom (brojVjezbi veci od 15)', function() {
         var podaci = {brojVjezbi:16, brojZadataka:[1,2,1,4,5,6,7,8,9,10,2,4,5,4,5,6]};
         VjezbeAjax.posaljiPodatke(podaci, (err, data) => {
            assert.equal(err, !null, "Treba biti greska");
            assert.equal(data,null, "Data nije null");
         });
    });

    it ('Ispravan rad posaljiPodatke sa errorom (brojVjezbi i duzina brojZadataka nisu jednaki)', function() {
         var podaci = {brojVjezbi:5, brojZadataka:[1,2,4,5]};
         VjezbeAjax.posaljiPodatke(podaci, (err, data) => {
            assert.equal(err, !null, "Treba biti greska");
            assert.equal(data,null, "Data nije null");
         });
    });
});

    describe ('VjezbeAjax dohvatiPodatke testovi', function() {
        it ('Ispravan rad dohvatiPodatke', function() {
             var podaci = {brojVjezbi:5, brojZadataka:[1,2,3,4,5]};
             VjezbeAjax.dohvatiPodatke((err,data) => {
                assert.equal(err, null, "Ne bi trebala biti greska");
                assert.deepEqual(JSON.parse(data),podaci, "Podaci nisu jednaki");
             });

        });
    });



   });
