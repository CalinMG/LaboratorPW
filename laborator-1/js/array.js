var li1=document.getElementById('li1').textContent;
var li2=document.getElementById('li2').textContent;
var li3=document.getElementById('li3').textContent;
var array=[li1,li2,li3];

function filtrareAn(string){
	if(string.includes('2024')){
		return string;
	}
}
function filtrareDoiDoi(string){
	const str2=string.split(' ');
	if(str2[1].includes("202")){
		return 1;
	}
}
lil1=li1.split(' ')[0];
lil2=li2.split(' ')[0];
lil3=li3.split(' ')[0];
array1=[lil1,lil2,lil3];

ultimul=array.map(x=>{const words=x.split(' '); return words[words.length-1];});
ultimul_an=ultimul.map(x=>x.split('-')[1]);
primul_an=ultimul.map(x=>x.split('-')[0]);

const totalAni=primul_an.reduce((sum,an,i)=>{
	const start=parseInt(an);
	const end=isNaN(parseInt(ultimul_an[i]))?2026:parseInt
	(ultimul_an[i]);
	return sum+(end-start);
},0);
console.log(totalAni);
console.log(array);
console.log(array.filter(filtrareAn));
console.log(array.filter(filtrareDoiDoi));
console.log(array1);
