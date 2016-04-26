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

function divideGrid(grid) {
  var filling = [];
  var blocks = sampleBlocks();
  var unplacedPieces = 0;
  var pieceId = 1;

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
    randomPiece = isolatePiece(randomPiece);
    if (!placePiece(filling, randomPiece, pieceId)) {
      unplacedPieces++;
    } else {
      unplacedPieces = 0;
      pieceId++;
    }
  }
  for (var xF = 0; xF < filling.length; xF++) {
    for (var yF = 0; yF < filling[xF].length; yF++) {
      while (filling[xF][yF] === 0) {
        var side = Math.floor(Math.random() * 4);
        switch (side) {
          case 0:
            if(filling[xF] && filling[xF][yF-1]) {
              filling[xF][yF] = filling[xF][yF-1];
            }
            break;
          case 1:
            if(filling[xF+1] && filling[xF+1][yF]) {
              filling[xF][yF] = filling[xF+1][yF];
            }
            break;
          case 2:
            if(filling[xF] && filling[xF][yF+1]) {
              filling[xF][yF] = filling[xF][yF+1];
            }
            break;
          case 3:
            if(filling[xF-1] && filling[xF-1][yF]) {
              filling[xF][yF] = filling[xF-1][yF];
            }
            break;
        }
      }
    }
  }
  consoleShowGrid(filling);
}

function placePiece(grid, piece, pieceId) {
  var placed = false;
  for (var x = 0; !placed && x < grid.length; x++) {
    for (var y = 0; !placed && y < grid[x].length; y++) {
      if (!checkCollision(grid, piece, x, y)) {
        for (var xP = 0; xP < piece.length; xP++) {
          for (var yP = 0; yP < piece[xP].length; yP++) {
            if (piece[xP][yP] !== 0) {
              grid[x + xP][y + yP] = pieceId;
              placed = true;
            }
          }
        }
      }
    }
  }
  return placed;
}

function checkCollision(grid, piece, x, y) {
  var collision = false;
  for (var xP = 0; xP < piece.length; xP++) {
    for (var yP = 0; yP < piece[xP].length; yP++) {
      if (grid[x + xP] === undefined || grid[x + xP][y + yP] === undefined || (grid[x + xP][y + yP] !== 0 && piece[xP][yP] === 1)) {
        collision = true;
      }
    }
  }
  return collision;
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

function isolatePiece(a) {
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
