var TestoviParser = (function() {
  var dajTacnost = function(string) {
    var ulaz;
    var izlaz = {"tacnost":"0%","greske":[]};
    try {
        ulaz=JSON.parse(string); 
        if (ulaz.stats.pending != 0)  {
          izlaz.greske[0]="Testovi se ne mogu izvršiti";
        return izlaz;
     }


     let x = ulaz.stats.passes/ulaz.stats.tests * 100;
    if (!Number.isInteger(x)) x=(Math.round(x*10) / 10);
    izlaz.tacnost= x  + "%";
    if (x<100) {
        for (var i = 0 ; i<ulaz.stats.failures ; i++) {
            izlaz.greske[i] = ulaz.failures[i].fullTitle;
        
        }
    }
    }
    catch(err) {
        izlaz.greske[0]="Testovi se ne mogu izvršiti";
        return izlaz;
    }
    

    return izlaz;
   }


    const porediRezultate = function(rezultat1, rezultat2) {
        try {
        const ulaz1 = JSON.parse(rezultat1);
        const ulaz2 = JSON.parse(rezultat2);
        var rezultat = {"promjena": "0%", "greske" : []};
        if (ulaz1.stats.tests==ulaz2.stats.tests){
            var identicni = false;
            for (let i = 0; i<ulaz1.stats.tests; i++) {
                identicni = false;
                for (let j=0; j<ulaz2.stats.tests; j++) {
                    if (ulaz1.tests[i].fullTitle==ulaz2.tests[j].fullTitle) identicni=true;
                }
            }
            if (identicni) {
                let x=dajTacnost(rezultat2);
                rezultat.promjena=x.tacnost;
                rezultat.greske=x.greske;
                rezultat.greske.sort();
                return rezultat;
            }
        }

        
                var razlika=[];
                var k = 0;
                for (let i = 0; i<ulaz1.stats.failures; i++) {
                identicni = false;
                for (let j=0; j<ulaz2.stats.tests; j++) {
                    if (ulaz1.failures[i].fullTitle==ulaz2.tests[j].fullTitle){
                     identicni=true;
                     break;
                    }
                } 
            if (!identicni) {
                razlika[k]=ulaz1.failures[i].fullTitle;
                k++;
            }
        }

            let x = (k + ulaz2.failures.length) / (k + ulaz2.stats.tests) * 100;
            if (!Number.isInteger(x)) x=(Math.round(x*10) / 10);
            rezultat.promjena=x + "%";

            let greske2= [];
             for (let i = 0; i < ulaz2.failures.length; i++)  {
                greske2[i] = ulaz2.failures[i].fullTitle;
             }
               
       razlika.sort();
       greske2.sort();

      rezultat.greske=razlika.concat(greske2);
       }

       catch (err) {
        rezultat.promjena="0%";
        rezultat.greske=["Testovi se ne mogu izvršiti"];
       }
        
        return rezultat;
    }

    
    return {
        dajTacnost:dajTacnost,
        porediRezultate:porediRezultate
    }
}());