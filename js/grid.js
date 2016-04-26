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
  var unplacedPieces = 0;

  for (var x in grid) {
    var row = [];
    for (var y in grid[x]) {
      row.push(0);
    }
    filling.push(row);
  }

  while (unplacedPieces < 10) {
    var randomPiece = blocks[Math.floor(Math.random() * 6)];
    randomPiece = rotatePiece(randomPiece, Math.floor(Math.random() * 4));
    randomPiece = isolate(randomPiece);
    consoleShowPiece(randomPiece);
    console.log(randomPiece);
    if(!placePiece(grid, randomPiece)) {
      unplacedPieces++;
    } else {
      unplacedPieces = 0;
    }
  }
}

function placePiece(grid, piece) {
  var placed = false;
  for (var x in grid) {
    for (var y in grid[x]) {
      if (grid[x][y] === 0) {

      }
    }
  }
  return placed;
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
    rotated = rotatePiece(rotatePiece(piece, 1), 1);
  } else if (rotation === 3) {
    rotated = rotatePiece(rotatePiece(rotatePiece(piece, 1), 1), 1);
  }
  return rotated;
}

function isolate(a) {
  var b = [];
  var zeros = false;
  for (var i in a) {
    zeros = true;
    for (var j in a[i]) {
      if (a[i][j] !== 0) {
        zeros = false;
      }
    }
    if (!zeros) {
      b.push(a[i]);
    }
  }
  var c = [];
  for (var y = 0; y < 4; y++) {
    zeros = true;
    for (var x in b) {
      if (b[x][y] !== 0) {
        zeros = false;
      }
    }
    c.push([]);
    if (!zeros) {
      for (var x1 in b) {
        c[y].push(b[x1][y]);
      }
    }
  }
  for (var x2 = 0; x2 < c.length; x2++) {
    if (c[x2].length === 0) {
      c.splice(x2, 1);
      x2--;
    }
  }
  return c;
}

function sampleBlocks() {
  //We are gonna use tetris blocks as first sample
  var pieces = [
    [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ],
    [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0]
    ],
  ];
  return pieces;
}

function consoleShowPiece(piece) {
  var l1 = '',
    l2 = '',
    l3 = '',
    l4 = '';
  for (var x in piece) {
    for (var y in piece[x]) {
      switch (x) {
        case '0':
          l1 += piece[x][y];
          break;
        case '1':
          l2 += piece[x][y];
          break;
        case '2':
          l3 += piece[x][y];
          break;
        case '3':
          l4 += piece[x][y];
          break;
      }
    }
  }
  if (l1) {
    console.log(l1);
  }
  if (l2) {
    console.log(l2);
  }
  if (l3) {
    console.log(l3);
  }
  if (l4) {
    console.log(l4);
  }
}
