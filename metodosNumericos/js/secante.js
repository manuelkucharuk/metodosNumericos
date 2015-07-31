
function raiz(){
	var res=secante();
	if(!res){return;}

  dibujarRaiz(res.raiz);
	$("#raiz").html("<H3>Raiz="+res.raiz+"<H3>");
	$("#cantPasos").text("Cant. pasos= "+res.cantPasos);
	$("#errorMaximo").text("Error máximo="+res.errorMax);
	$("#resultado").show();
}


function secante(){
	var x0=parseFloat($("#p1X").val());
	var x1=parseFloat($("#p2X").val());

  var xTemp;
  var eps=parseFloat($("#errorMax").val());
  var n=parseInt($("#cantPasosMax").val());

	var i=0;
  var d=Infinity;
  while(d>eps && i<n){
    xTemp=x1-f(x1)*(x1-x0)/(f(x1)-f(x0));
    //Si no se reduce la diferencia, el metodo no converge
    if (d<Math.abs(xTemp-x1)){
			alert("El método no converge");
		  return;
    }
    d=Math.abs(x1-x0);
    x0=x1;
    x1=xTemp;
    i++;
  }
  if(i>=n){
  	alert("No se alcanzó la precisión de "+eps+" en "+n+" pasos");
  	return;
	}
	return {errorMax: d, cantPasos: i-1, raiz: x1};
}
