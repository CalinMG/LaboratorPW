const form = document.querySelector('form');
function submitForm() { 

	const name=document.getElementById("name").value;
	const email=document.getElementById("email").value;
	const text=document.getElementById("text").value;
	form.addEventListener('submit', function(event) { 
	event.preventDefault();  // Opreste reload-ul paginii 
	if(name.length<2){
		document.getElementById('form-feedback').textContent="NUMELE TREBUIE SA CONTINA MINIM 2 CARACTERE!@@@@@@@@!@!!!!"
		document.getElementById('form-feedback').style.color="#FF8904";
	}
}); 
	console.log(name);
	console.log(email);
	console.log(text);
	console.warn("Goodbye World")
} 

function MesajTimp() {
  let date = new Date();
  let hour = date.getHours();
  if (hour >=6&&hour<12) {
     document.querySelector('header p').textContent="buna dimineata!!!!!!!!!!!!!!!!!!!!!";
  } else if (hour >= 12&&hour<18) {
    document.querySelector('header p').textContent ="buna ziua!!!!!!!!!!!!!!!!!!!!!!!!";
  } else{
    document.querySelector('header p').textContent ="buna seara!!!!!!!!!!!!!!!!!!!!!!!!";
  }
}


