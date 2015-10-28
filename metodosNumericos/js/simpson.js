function raiz(){
	var res=newtonRaphson();
	if(!res){return;}

  dibujarRaiz(res.raiz);
	$("#raiz").html("<H3>Raiz="+res.raiz+"<H3>");
	$("#cantPasos").text("Cant. pasos= "+res.cantPasos);
	$("#errorMaximo").text("Error máximo="+res.errorMax);
	$("#resultado").show();
}

function newtonRaphson(){
	var x0=parseFloat($("#x0").val());
	var x1=x0;
	var eps=parseFloat($("#errorMax").val());
	var n=parseInt($("#cantPasosMax").val());

	var i=0;
	var d=Infinity;
	while(d>eps && i<n){
		x1=x0-f(x0)/fp(x0);
		if (d<Math.abs(x1-x0)){ //Si no se reduce la diferencia, el metodo no converge
			alert("El método no converge");
			return;
		}
		d=Math.abs(x1-x0);
		x0=x1;
		i++;
	}
	if(i>=n){
		alert("No se alcanzó la precisión de "+eps+" en "+n+" pasos");
  	return;
	}
	return {errorMax: d, cantPasos: i-1, raiz: x1};
}
