function posaljiPostBatch() {


	csv=document.getElementById("csv").value;
	

	StudentAjax.dodajBatch(csv,(err,data) => {
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