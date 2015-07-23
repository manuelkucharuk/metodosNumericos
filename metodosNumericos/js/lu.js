$(document).ready(function(){
	var data = [
        [11, 12, 13],
        [20, 11, 14, 13],
        [30, 15, 12, 13]
      ];

      var container = document.getElementById('tablaA');
      var hot = new Handsontable(container, {
        data: data,
        minSpareRows: 1,
        minSpareCols: 1,
        rowHeaders: false,
        colHeaders: false,
        contextMenu: true
      });
});