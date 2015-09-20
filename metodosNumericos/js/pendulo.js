(function(){
	var dt,k,m,g,L0,LAct,xAnt,yAnt,xAct,yAct,xMin,yMin,xMax,yMax;
	var brd,p,resorte,recorrido,box;
	var timerMover,timerCorregir;

	var iniciarGrafico = function (){
		dt = 0.05;
		g = 9.8;

		m = parseFloat($("#m").val());
		k = parseFloat($("#k").val());
		L0= parseFloat($("#L0").val());
		
		xAct=xAnt=parseFloat($("#x0").val());
		yAct=yAnt=parseFloat($("#y0").val());

		if(typeof brd !== 'undefined') box=brd.getBoundingBox();
		else box=[
			-Math.abs(yAct)*1.5,
			Math.max(L0*1.5,Math.abs(yAct)*1.5),
			Math.max(L0*1.5,Math.abs(yAct)*1.5),
			-Math.abs(yAct)*1.5
			];
		brd = JXG.JSXGraph.initBoard('grafico',{boundingbox:box, keepaspectratio:false, 
			axis:true, showNavigation:false, showCopyright:false});

		p = brd.createElement('point',[xAct,yAct],{face:'o', size:6, strokeColor:'red', withLabel: false});
		p.on("drag",function(){
			$("#x0").val(p.X());
			$("#y0").val(p.Y());
		});

		resorte = brd.createElement('segment',[p,[0,L0]],{dash: 2});
		
		if($("#recorrido").prop("checked")){
			recorrido = brd.createElement('turtle',[xAct,yAct]);
			recorrido.hideTurtle();
		}
	};

	var proxPos = function(){
		//Dadas una posición actual y una anterior devuelve la proxima posición
		LAct=Math.sqrt(Math.pow(xAct,2)+Math.pow(L0-yAct,2));

		xProx=2*xAct-xAnt-Math.pow(dt,2)*(k/m*xAct*(1-L0/LAct));
		yProx=2*yAct-yAnt+Math.pow(dt,2)*(k/m*(L0-yAct)*(1-L0/LAct)-g);
	  
	  	return([xProx,yProx]);
	};

	var graficar = function(){
		var mover = function(){
			var pos=proxPos();
			xAnt=xAct; xAct=pos[0];
			yAnt=yAct; yAct=pos[1];

			p.moveTo(pos);
			if(typeof recorrido!=='undefined') recorrido.moveTo(pos);
			actualizarResultados();
		}
		timerMover = setInterval(mover,dt*1000);
	};

	var actualizarInputs = function(){
		$("#x0").val(p.X());
		$("#y0").val(p.Y());
	};

	var actualizarResultados = function(){
		var txtPos = "Posicion: (" + xAct.toFixed(3) + " , " + yAct.toFixed(3) + ")";
		var txtLong = "Longitud del resorte: " + LAct.toFixed(3);
		$("#posicion").html("<H3>"+txtPos+"</H3>");
		$("#L").html("<H3>"+txtLong+"</H3>");
	}
	

	//Eventos:
	$("#zoomInX").on("click",function(){
		brd.attr.zoom.factory = 1.0;
        brd.attr.zoom.factorx = 1.25;
        brd.zoomIn();   // or call brd.zoomOut()
	});
	$("#zoomOutX").on("click",function(){
		brd.attr.zoom.factory = 1.0;
        brd.attr.zoom.factorx = 1.25;
        brd.zoomOut();
	});
	$("#zoomInY").on("click",function(){
		brd.attr.zoom.factory = 1.25;
        brd.attr.zoom.factorx = 1.0;
        brd.zoomIn();   // or call brd.zoomOut()
	});

	$("#zoomOutY").on("click",function(){
		brd.attr.zoom.factory = 1.25;
        brd.attr.zoom.factorx = 1.0;
        brd.zoomOut();
	});

	$("#izq").on("click",function(){
		brd.moveOrigin(brd.origin.scrCoords[1] + brd.canvasWidth * 0.1, brd.origin.scrCoords[2]);
	});

	$("#der").on("click",function(){
		brd.moveOrigin(brd.origin.scrCoords[1] - brd.canvasWidth * 0.1, brd.origin.scrCoords[2]);
	});

	$("#up").on("click",function(){
		brd.moveOrigin(brd.origin.scrCoords[1], brd.origin.scrCoords[2] + brd.canvasHeight * 0.1);
	});

	$("#down").on("click",function(){
		brd.moveOrigin(brd.origin.scrCoords[1], brd.origin.scrCoords[2] - brd.canvasHeight * 0.1);
	});

	$("#boton").on("click",function(){
		iniciarGrafico();
		if($(this).text()=="Empezar"){
			$("#selecciones input").prop("disabled",true);
			$("#resultado").show();
			$(this).text("Reset");
			graficar();
		}
		else if($(this).text()=="Reset"){
			$("#selecciones input").prop("disabled",false);
			$("#resultado").hide();
			$(this).text("Empezar");
			clearInterval(timerMover);
		}
	});
})();

