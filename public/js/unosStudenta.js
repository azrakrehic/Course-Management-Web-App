function posaljiPost() {
	var vrati = {
		ime:"",
		prezime:"",
		index:"",
		grupa:""
	}

	ime=document.getElementById("ime").value;
	vrati.ime=ime;
	prezime=document.getElementById("prezime").value;
	vrati.prezime=prezime;
	index=document.getElementById("index").value;
	vrati.index=index;
	grupa=document.getElementById("grupa").value;
	vrati.grupa=grupa;

	StudentAjax.dodajStudenta(vrati,(err,data) => {
		if (err) {
			console.log("Podaci nisu uspjesno poslani.");
			document.getElementById("ajaxstatus").innerHTML = JSON.stringify(data);
		}
			else{
				console.log("Podaci su uspjesno poslani.");
				document.getElementById("ajaxstatus").innerHTML = JSON.stringify(data);
			} 
	})
}