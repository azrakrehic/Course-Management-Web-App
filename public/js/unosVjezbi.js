function dodajPolja() {
	VjezbeAjax.dodajInputPolja(document.getElementById("zadaci"), document.getElementById("vjezbe").value);
}

function posaljiPost() {
	var vrati = {
		brojVjezbi:"",
		brojZadataka:[]
	}

	broj=document.getElementById("vjezbe").value;
	vrati.brojVjezbi=broj;

	for (let i =0; i<broj ; i++) {
		vrati.brojZadataka[i]  = document.getElementById("z"+i).value;
	}

	VjezbeAjax.posaljiPodatke(vrati,(err,data) => {
		if (err) console.log("Podaci nisu uspjesno poslani.");
			else console.log("Podaci su uspjesno poslani.");
	})
}