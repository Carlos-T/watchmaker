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

function createGrid(paragraph) {
  var grid = [];
  var heigth = calculateDimensions(paragraph);
  for (var x = 0; x < heigth; x++) {
    var row = [];
    for (var y = 0; y < paragraph.length / heigth; y++) {
      row.push('');
    }
    grid.push(row);
  }
  grid = fillGrid(grid, paragraph);
  return grid;

  function calculateDimensions(paragraph) {
    var heigth = 10;
    var gridReady = false;
    var minWidth = 25;
    var maxWidth = 30;
    while (!gridReady) {
      if (paragraph.length / heigth < minWidth) {
        heigth--;
      } else if (paragraph.length / heigth > maxWidth) {
        heigth++;
      } else {
        gridReady = true;
      }
    }
    return heigth;
  }

  function fillGrid(grid, paragraph) {
    for (var x = 0; x < grid.length; x++) {
      for (var y = 0; y < grid[x].length; y++) {
        grid[x][y] = paragraph.charAt(x * grid[x].length + y);
      }
    }
    return grid;
  }
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

function divideGrid(grid) {
  var filling = [];
  var blocks = sampleBlocks();
  var full = false;

  for (var x in grid) {
    var row = [];
    for (var y in grid[x]) {
      row.push(0);
    }
    filling.push(row);
  }

  while (!full) {
    var randomPiece = blocks[ Math.floor(Math.random() * 6)];
    randomPiece = rotatePiece(randomPiece, Math.floor(Math.random() * 4));
    randomPiece = isolate(randomPiece);
    consoleShowPiece(randomPiece);
    full = isFull(filling);
  }
}

function pieceFits(grid, piece) {
  for(var x in grid) {
    for(var y in grid[x]) {
      if(grid[x][y] === 0) {

      }
    }
  }
}

function isFull(grid) {
  return true;
}

function rotatePiece(piece, rotation) {
  var rotated = [];
  if (rotation === 0) {
    rotated = piece;
  } else if (rotation === 1) {
    for (var x = 0; x < piece.length; x++) {
      var row = [];
      for (var y = 0; y < piece[x].length; y++) {
        row.push(piece[piece.length - 1 - y][x]);
      }
      rotated.push(row);
    }
  } else if (rotation === 2) {
    rotated = rotatePiece(rotatePiece(piece, 1),1);
  } else if(rotation === 3) {
    rotated = rotatePiece(rotatePiece(rotatePiece(piece, 1),1),1);
  }
  return rotated;
}

function isolate(piece) {
  var isOnTop = false;
  for(var x in piece) {

  }
}

function sampleBlocks() {
  //We are gonna use tetris blocks as first sample
  var pieces = [];
  pieces.push([
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0]
  ]);
  pieces.push([
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
  ]);
  pieces.push([
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);
  pieces.push([
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);
  pieces.push([
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ]);
  pieces.push([
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0]
  ]);
  pieces.push([
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
  ]);
  return pieces;
}

function consoleShowPiece(piece) {
  console.log(piece[0][0] + '' + piece[1][0] + '' + piece[2][0] + '' + piece[3][0]);
  console.log(piece[0][1] + '' + piece[1][1] + '' + piece[2][1] + '' + piece[3][1]);
  console.log(piece[0][2] + '' + piece[1][2] + '' + piece[2][2] + '' + piece[3][2]);
  console.log(piece[0][3] + '' + piece[1][3] + '' + piece[2][3] + '' + piece[3][3]);
}
