var VjezbeAjax = (function() {
    var dodajInputPolja = function(DOMelementDIVauFormi, brojVjezbi) {
        for (let i = 0; i < brojVjezbi; i++) {
            DOMelementDIVauFormi.appendChild(document.createTextNode("Vjezba" + (i + 1) + "  "));
            var zadaci = document.createElement("input");
            zadaci.type = "number";
            zadaci.name = "z" + i;
            zadaci.id = "z" + i;
            zadaci.value = 4;
            DOMelementDIVauFormi.appendChild(zadaci);
            DOMelementDIVauFormi.appendChild(document.createElement("br"));
        }
    };

    var posaljiPodatke = function(vjezbeObjekat, callbackFja) {
        let zahtjev = new XMLHttpRequest();
        zahtjev.onreadystatechange = function() {
            if (zahtjev.readyState == 4) {
                if (zahtjev.status == 200) {
                callbackFja(null, JSON.parse(zahtjev.responseText));
            }
            else {
                callbackFja(zahtjev.status);
            }
        }
    };

        zahtjev.open("POST", "http://localhost:3000/vjezbe", true);
        zahtjev.setRequestHeader('Content-type', 'application/json');
        zahtjev.send(JSON.stringify(vjezbeObjekat));
    };

    var dohvatiPodatke = function(callbackFja) {
        let zahtjev = new XMLHttpRequest();
        zahtjev.onreadystatechange = function() {
            if (zahtjev.readyState == 4 && zahtjev.status == 200) {
                callbackFja(null, zahtjev.responseText);
            } 
        };

        zahtjev.open("GET", "http://localhost:3000/vjezbe", true);
        zahtjev.send();

    };


    var iscrtajVjezbe = function(divDOMelement, o) {
        let vjezbe = o.brojVjezbi;
        let zadaci = o.brojZadataka;


        if (vjezbe != zadaci.length) {
            console.log("Parametri su neispravni.");
            return;
        }

        for (let i = 0; i < vjezbe; i++) {
            if (zadaci[i] < 0 || zadaci[i] > 10) {
                console.log("Parametri su neispravni.");
                return;
            }
        }

        if (vjezbe < 1 || vjezbe > 15) {
            console.log("Parametri su neispravni.");
            return;
        }

        for (let i = 0; i < vjezbe; i++) {
            let dugmeVjezba = document.createElement("button");
            dugmeVjezba.id = "vjezba" + (i + 1);
            dugmeVjezba.value = zadaci[i];
            dugmeVjezba.setAttribute("class", "v");

            dugmeVjezba.textContent = "VJEŽBA " + (i + 1);
           dugmeVjezba.onclick = function() {
                iscrtajZadatke(dugmeVjezba, dugmeVjezba.value);
            } 
            divDOMelement.appendChild(dugmeVjezba);
            let divZadaci = document.createElement("div");
            divZadaci.setAttribute("class", "zadaci");

            divDOMelement.appendChild(divZadaci); 

        }
    };


    var iscrtajZadatke = function(vjezbaDOMelement, brojZadataka) {
        var prikazani = 0;
             for (let k=2; k<=vjezbaDOMelement.parentNode.childElementCount; k+=2) {
                if (vjezbaDOMelement.parentNode.childNodes[k].style.display=="inline-block") prikazani = k;
                vjezbaDOMelement.parentNode.childNodes[k].style.display = "none";
            
        } 
        for (let i = 1; i < vjezbaDOMelement.parentNode.childElementCount; i += 2) { //svaki drugi child element je dugme za vjezbu 
            if (vjezbaDOMelement.parentNode.childNodes[i].isSameNode(vjezbaDOMelement)) { //kada dodjemo do onog proslijedjenog dugmeta
                if (vjezbaDOMelement.parentNode.childNodes[i + 1].childElementCount == 0) { //ako je sljedeci child node(odnosno div u kojem su zadaci) prazan dodajemo zadatke
                    for (let j = 0; j < brojZadataka; j++) {
                        var zadatakDugme = document.createElement("button");
                        zadatakDugme.id = "z" + (i + 1);
                        zadatakDugme.textContent = "ZADATAK " + (j + 1);
                        zadatakDugme.setAttribute("class", "zadatak");
                        vjezbaDOMelement.parentNode.childNodes[i + 1].appendChild(zadatakDugme); //u div zadataka smjestamo dugmad za zadatke 
                    }

                }

                if (vjezbaDOMelement.parentNode.childNodes[i+1].style.display == "none" && prikazani!=(i+1) ) vjezbaDOMelement.parentNode.childNodes[i+1].style.display="inline-block";
                     
        } 
           
            
        }

    };
    return {
        dodajInputPolja: dodajInputPolja,
        posaljiPodatke: posaljiPodatke,
        dohvatiPodatke: dohvatiPodatke,
        iscrtajVjezbe: iscrtajVjezbe,
        iscrtajZadatke: iscrtajZadatke
    }
})();