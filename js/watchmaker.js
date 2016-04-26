function init() {
  var paragraph = getParagraph();
  var grid = createGrid(paragraph);
  var pieces = divideGrid(grid);
  showGrid(grid);
}

function getParagraph() {
  var paragraph = "Mi dibujo no representaba un sombrero. Representaba una serpiente boa que digería un elefante. Dibujé entonces el interior de la serpiente boa a fin de que las personas grandes pudiesen comprender. Siempre necesitan explicaciones.";
  var paragraph2 = "Una de sus más importantes habilidades será, siempre, la de extraer de cuanto lo rodea la esencia y la energía que le permitan vivir y crecer artísticamente. Y lo mismo de las personas. Las exprime, utilizando lo mejor de cada una.";
  return paragraph;
}

function showGrid(grid) {
  var table = $('<table>');
  for (var x = 0; x < grid.length; x++) {
    var row = $('<tr>');
    for (var y = 0; y < grid[x].length; y++) {
      var element = $('<td>').text(grid[x][y]);
      if (grid[x][y] === ' ' || grid[x][y] === '') {
        element.addClass('whitespace');
      }
      row.append(element);
    }
    table.append(row);
  }
  $('body').append(table);
}

function consoleShowGrid(grid) {
  var displayGrid = [];
  for (var x in grid) {
    displayGrid.push('');
    for (var y in grid[x]) {
      displayGrid[x] += grid[x][y] < 10 ? '  ' + grid[x][y] : ' ' + grid[x][y];
    }
  }
  console.log('');
  for (var xG in displayGrid) {
    console.log(displayGrid[xG] + '  -  ' + xG);
  }
}
