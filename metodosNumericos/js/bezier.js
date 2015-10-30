var board=null;

$(document).ready(function(){
  board=JXG.JSXGraph.initBoard('grafico', {boundingbox:[-1,11,11,-1], keepaspectratio: false, axis: false});
  board.create('point',[0,0],{strokeColor:'red', name:'p1'});
  board.create('point',[3,9],{strokeColor:'red', name:'p2'});
  board.create('point',[5,3],{strokeColor:'red', name:'p3'});
  board.create('point',[8,3],{strokeColor:'red', name:'p4'});
  board.create('point',[7,8],{strokeColor:'red', name:'p5'});
});
