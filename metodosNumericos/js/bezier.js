var board=null;

$(document).ready(function(){
  board=JXG.JSXGraph.initBoard('grafico', {
  	boundingbox:[-1,11,11,-1], 
  	keepaspectratio: false, 
  	axis: true,
  	showCopyright: false,
  	showNavigation: false
  });
  
  var vertices = crearVertices(5);
  var puntosControl = crearPuntosControl(vertices);
  var curva = board.create('curve',crearDatosBezier(vertices,puntosControl),{strokeWidth:3});

  //Eventos
  var n = vertices.length;
  var i;
  for(i=0;i<n;i++){
  	vertices[i].on("drag",function(){
  		actualizarCurva(curva,vertices,puntosControl);
  	});
  }

});

function crearVertices(n){
	var i;
	var vertices = [];
	for(i=0;i<n;i++){
		vertices[i] = board.create("point",
			[Math.random()*10,Math.random()*10],
			{withLabel: false, id:"p"+i}
		);
	}
	return vertices;
}

function crearPuntosControl(vertices){
	//Separo los vertices en sus componentes para
	//calcular p1 y p2
	var vs = separarEnComponentes(vertices);
	var px = calcularPuntosControl(vs.x);
	var py = calcularPuntosControl(vs.y);
	var puntos = {p1: [], p2: []};
	var i;
	var n = vertices.length;
	//Transformo el resultado del calculo de los puntos de control
	//en objetos p1: [x,y], p2: [x,y]
	var opciones = {
		strokeColor: 'blue',
		strokeOpacity: 0.2,
		fillColor:'blue', 
		fillOpacity: 0.2,
		withLabel: false, 
		fixed: true,
		dash: 1
	};
	for(i=0;i<n-1;i++){
		puntos.p1[i] = board.create("point",[px.p1[i],py.p1[i]],opciones);
		puntos.p2[i] = board.create("point",[px.p2[i],py.p2[i]],opciones);
		board.create("segment",[vertices[i],puntos.p1[i]],opciones);
		board.create("segment",[puntos.p1[i],puntos.p2[i]],opciones); 
		board.create("segment",[puntos.p2[i],vertices[i+1]],opciones);  	 
	}

	return puntos;
}


function crearDatosBezier(vertices,puntosControl){
	var n = vertices.length;
	var i,vi,vi1,p1,p2;
	var datos = {x: [], y: []};

	var curvas = [];
	for(i=0;i<n-1;i++){
		vi  = {x: vertices[i].X(), y: vertices[i].Y()};
		vi1 = {x: vertices[i+1].X(), y: vertices[i+1].Y()};
		p1 = {x: puntosControl.p1[i].X(), y: puntosControl.p1[i].Y()};
		p2 = {x: puntosControl.p2[i].X(), y: puntosControl.p2[i].Y()};

		curvas[i] = polinomioBezier(vi, p1, p2, vi1);

		datos.x = datos.x.concat(curvas[i].x);
		datos.y = datos.y.concat(curvas[i].y);
	}

	return [datos.x,datos.y];
}



function calcularPuntosControl(vertices){
	var p1 = [];
	var p2 = [];
	var n = vertices.length-1;
	/*Vectores para resolver sistema tridiagonal*/
	var a = [];
	var b = [];
	var c = []; 
	var r = [];
	
	/*1er segmento*/
	a[0]=0;
	b[0]=2;
	c[0]=1;
	r[0]= vertices[0]+2*vertices[1];
	
	/*Segmentos internos*/
	for (var i=1; i<n-1; i++)
	{
		a[i]=1;
		b[i]=4;
		c[i]=1;
		r[i]= 4*vertices[i] + 2*vertices[i+1];
	}
			
	/*Ultimo segmento*/
	a[n-1]=2;
	b[n-1]=7;
	c[n-1]=0;
	r[n-1]= 8*vertices[n-1]+vertices[n];
	
	/*Resolver sistema tridiagonal con el algoritmo de Thomas*/
	for (i = 1; i < n; i++)
	{
		var m = a[i]/b[i-1];
		b[i] = b[i] - m * c[i - 1];
		r[i] = r[i] - m*r[i-1];
	}
 	
 	//Calcular p1
	p1[n-1] = r[n-1]/b[n-1];
	for (i = n - 2; i >= 0; i--)
		p1[i] = (r[i] - c[i] * p1[i+1]) / b[i];
		
	/*Ya tenemos p1, calcular p2*/
	for (i=0;i<n-1;i++)
		p2[i]=2*vertices[i+1]-p1[i+1];
	
	p2[n-1]=0.5*(vertices[n]+p1[n-1]);
	
	return {p1:p1, p2:p2};
}


function polinomioBezier(p0,p1,p2,p3){
	var t=0, i, pasos;
	pasos=100;
	var dt = 1/pasos;
	var res = { x: [], y:[] };
	for(i=0;i<=pasos;i++){
		res.x[i]= 
			Math.pow(1-t,3)*p0.x + 
			3*Math.pow(1-t,2)*t*p1.x + 
			3*(1-t)*Math.pow(t,2)*p2.x +
			Math.pow(t,3)*p3.x;

		res.y[i]=
			Math.pow(1-t,3)*p0.y + 
			3*Math.pow(1-t,2)*t*p1.y + 
			3*(1-t)*Math.pow(t,2)*p2.y +
			Math.pow(t,3)*p3.y;
		t = i*dt;
	}
	
	return res;
}

function separarEnComponentes(vertices){
	var n = vertices.length;
	var i, verticesX=[], verticesY=[];
	for(i=0;i<n;i++){
		verticesX[i] = vertices[i].X();
		verticesY[i] = vertices[i].Y();
	}
	return {x: verticesX, y: verticesY}
}


function actualizarCurva(curva,vertices,puntosControl){
	board.suspendUpdate();
	var psControl = actualizarPuntosControl(vertices,puntosControl) 
	var datos = crearDatosBezier(vertices,psControl);
  curva.dataX = datos[0];
  curva.dataY = datos[1];
  board.unsuspendUpdate();
}

function actualizarPuntosControl(vertices,puntosControl){
	var vs = separarEnComponentes(vertices);
	var px = calcularPuntosControl(vs.x);
	var py = calcularPuntosControl(vs.y);
	var n = vertices.length;
	var i;
	for(i=0;i<n-1;i++){
		puntosControl.p1[i].moveTo([px.p1[i],py.p1[i]]);
		puntosControl.p2[i].moveTo([px.p2[i],py.p2[i]]);
	}
	return puntosControl;
}
