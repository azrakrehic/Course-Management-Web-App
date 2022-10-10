function posaljiPut() {
	
	index=document.getElementById("index").value;
	grupa=document.getElementById("grupa").value;

	StudentAjax.postaviGrupu(index,grupa,(err,data) => {
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