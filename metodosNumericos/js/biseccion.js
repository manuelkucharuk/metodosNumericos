
function raiz(){
	var res=biseccion();
	if(!res){return;}

  dibujarRaiz(res.raiz);
	$("#raiz").html("<H3>Raiz="+res.raiz+"<H3>");
	$("#cantPasos").text("Cant. pasos= "+res.cantPasos);
	$("#errorMaximo").text("Error máximo="+res.errorMax);
	$("#resultado").show();
}


function biseccion(){
	var a=parseFloat($("#aproxInf").val());
	var b=parseFloat($("#aproxSup").val());
	if(a>b){
		var temp=a;
		a=b;
		b=temp;
	}
	var c;
	var eps=parseFloat($("#errorMax").val());
	var n=parseInt($("#cantPasosMax").val());

	var i=0;

  if (sgn(f(a))==sgn(f(b))){alert("Los signos de f(x) son iguales en los límites de aproximación"); return null;}
  var tol=Infinity; //Infinito para que siempre entre al while

  while(tol>eps && i<n){
    tol=Math.abs(b-a);
    sa=sgn(f(a));
    sb=sgn(f(b));

    if(sa==0){
      c=a;
      tol=0;
      break;
    }
    else if(sb==0){
      c=b;
      tol=0;
      break;
    }

    c=(b+a)/2;
    sc=sgn(f(c));
    if(sc==0){
      tol=0;
      break;
    }
    if(sa==sc){a=c;}
    else{b=c;}

    i++;
  }

  if(tol>eps || i>=n) {
  	alert("No se alcanzó la precisión de "+eps+" en "+n+" pasos");
  	return null;
  }

  return {errorMax: tol, cantPasos: i, raiz: c};
}
