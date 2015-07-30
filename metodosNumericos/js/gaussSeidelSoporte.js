var A=null;
var bCol=null
var x0Col=null;
$(document).ready(function(){
  $("#matrizA").height($("#matrizA").width()/2);
  $("#vectorX0").height($("#matrizA").height());
  $("#vectorB").height($("#matrizA").height());
  $("#vectorX").height($("#matrizA").height());

  $("#btnInfoAdicional").hide();
  $("#infoAdicional").hide();

  A=[[4,-1,0,-1,0,0],
   [-1,4,-1,0,-1,0],
   [0,-1,4,0,0,-1],
   [-1,0,0,4,-1,0],
   [0,-1,0,-1,4,-1],
   [0,0,-1,0,-1,4]
  ];
  var n=A.length;

  var b=[0,5,0,6,-2,6];
  bCol=new Array(n);
  for(var i=0;i<n;i++){
    bCol[i]=new Array(1);
    bCol[i][0]=b[i];
  }

  var x0=[0,0,0,0,0,1];
  x0Col=new Array(n);
  for(var i=0;i<n;i++){
    x0Col[i]=new Array(1);
    x0Col[i][0]=x0[i];
  }  
  
  var xCol =[["?"],["?"],["?"],["?"],["?"],["?"]];

  mostrarMatriz(A,$("#matrizA")[0]);
  mostrarVector(x0Col,$("#vectorX0")[0]);
  mostrarVector(bCol,$("#vectorB")[0]);
  mostrarVector(xCol,$("#vectorX")[0],{readOnly: true});
});
