var StudentAjax=(function() {
	var dodajStudenta = function(student,fnCallback) {
		let zahtjev = new XMLHttpRequest();
        zahtjev.onreadystatechange = function() {
            if (zahtjev.readyState == 4) {
                if (zahtjev.status == 200) {
                fnCallback(null, JSON.parse(zahtjev.responseText));
            }
            else {
                fnCallback(zahtjev.status);
            }
        }
    };

        zahtjev.open("POST", "http://localhost:3000/student", true);
        zahtjev.setRequestHeader('Content-type', 'application/json');
        zahtjev.send(JSON.stringify(student));
	};


var postaviGrupu = function(index,grupa,fnCallback){
let zahtjev = new XMLHttpRequest();
        zahtjev.onreadystatechange = function() {
            if (zahtjev.readyState == 4) {
                if (zahtjev.status == 200) {
                fnCallback(null, JSON.parse(zahtjev.responseText));
            }
            else {
                fnCallback(zahtjev.status);
            }
        }
    };

        zahtjev.open("PUT", "http://localhost:3000/student/"+index, true);
        zahtjev.setRequestHeader('Content-type', 'application/json');
        zahtjev.send(JSON.stringify({"grupa": grupa}));
	};

var dodajStudenta = function(student,fnCallback) {
		let zahtjev = new XMLHttpRequest();
        zahtjev.onreadystatechange = function() {
            if (zahtjev.readyState == 4) {
                if (zahtjev.status == 200) {
                fnCallback(null, JSON.parse(zahtjev.responseText));
            }
            else {
                fnCallback(zahtjev.status);
            }
        }
    };

        zahtjev.open("POST", "http://localhost:3000/student", true);
        zahtjev.setRequestHeader('Content-type', 'application/json');
        zahtjev.send(JSON.stringify(student));
	};

var dodajBatch = function(csvStudenti,fnCallback) {
		let zahtjev = new XMLHttpRequest();
        zahtjev.onreadystatechange = function() {
            if (zahtjev.readyState == 4) {
                if (zahtjev.status == 200) {
                fnCallback(null, JSON.parse(zahtjev.responseText));
            }
            else {
                fnCallback(zahtjev.status);
            }
        }
    };

        zahtjev.open("POST", "http://localhost:3000/batch/student", true);
        zahtjev.setRequestHeader('Content-type', 'text/plain');
        zahtjev.send(csvStudenti);
	};


	return {
		dodajStudenta:dodajStudenta,
	    postaviGrupu:postaviGrupu,
	    dodajBatch:dodajBatch
	}
})();