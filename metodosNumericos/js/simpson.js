function integrar(){
	var res=simpson();
	if(!res)return;

	$("#integral").html("<H3>Integral="+res.integral.toFixed(5)+"</H3>");
	$("#resultado").show();
}

function simpson(){
	var a = parseFloat($("#limInf").val());
	var b = parseFloat($("#limSup").val());
	
	var x, j;
	var fvec = [];
	var sumaPar = 0
	var sumaImpar = 0;
	var n = cantPuntos();
	if(!n) return;
	var h = (b-a)/n;

	j = 1;
	x = a+h;
	while(j<n){
		if(j%2==0) sumaPar+=f(x);
		else sumaImpar+=f(x);

		j++;
		x += h; 
	}

	return {integral: h/3*(f(a)+4*sumaImpar+2*sumaPar+f(b))};
}

function cantPuntos(){
  var n = parseInt($("#cantPuntos").val());
  if(isNaN(n) || n%2==0) {
    if(n%2==0) n++;
    else if(isNaN(n)) n=1;
    $("#cantPuntos").val(n);
  }
  if(n>1000000){alert("Demasiados puntos"); return false;}

  return n+1; //+1 para incluir al ultimo punto
}