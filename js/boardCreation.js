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
    var minWidth = 20;
    var maxWidth = 30;
    var paragraphSubs = paragraph.replace(/\,/, '').replace(/\./, '');
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
    var offset = 0;
    for (var x = 0; x < grid.length; x++) {
      for (var y = 0; y < grid[x].length; y++) {
        grid[x][y] = paragraph.charAt(x * grid[x].length + y + offset);
        if (paragraph.charAt(x * grid[x].length + y + offset + 1) === ',' ||
          paragraph.charAt(x * grid[x].length + y + offset + 1) === '.') {
          grid[x][y] += paragraph.charAt(x * grid[x].length + y + offset + 1);
          offset++;
        }
      }
    }
    return grid;
  }
}

function divideGrid(grid) {
  var filling = [];
  var pieces = [];
  var blocks = sampleBlocks();
  var unplacedPieces = 0;
  var pieceId = 1;
  var work = true;

  for (var x in grid) {
    var row = [];
    for (var y in grid[x]) {
      row.push(0);
    }
    filling.push(row);
  }

  while (unplacedPieces < 10) {
    var randomPiece = blocks[Math.floor(Math.random() * blocks.length)];
    randomPiece = rotatePiece(randomPiece, Math.floor(Math.random() * 4));
    randomPiece = isolatePiece(randomPiece);
    if (placePiece(filling, randomPiece, pieceId, grid)) {
      pieces.push({id: pieceId, piece: randomPiece});
      unplacedPieces = 0;
      pieceId++;
    } else {
      unplacedPieces++;
    }
  }
  consoleShowGrid(filling);
  while (work) {
    work = false;
    for (var xF = 0; xF < filling.length; xF++) {
      for (var yF = 0; yF < filling[xF].length; yF++) {
        var posibilities = [];
        if (filling[xF][yF] === 0) {
          if (filling[xF - 1] && filling[xF - 1][yF]) {
            posibilities.push({
              position: 'top',
              value: filling[xF - 1][yF]
            });
          }
          if (filling[xF][yF + 1]) {
            posibilities.push({
              position: 'right',
              value: filling[xF][yF + 1]
            });
          }
          if (filling[xF + 1] && filling[xF + 1][yF]) {
            posibilities.push({
              position: 'bottom',
              value: filling[xF + 1][yF]
            });
          }
          if (filling[xF][yF - 1]) {
            posibilities.push({
              position: 'left',
              value: filling[xF][yF - 1]
            });
          }
          if (posibilities.length === 0) {
            work = true;
            if(Debug) console.log('rework');
          } else {
            var noRepeats = posibilities.filter(function(element, index, originalArray) {
              var repeated = false;
              for (var i in originalArray) {
                if (originalArray[i].value == element.value) {
                  repeated = true;
                }
              }
              return !repeated;
            });
            if (noRepeats.length === 0) {
              filling[xF][yF] = posibilities[Math.floor(Math.random() * posibilities.length)].value;
              if(Debug) console.log('no choices... generating a block on ' + xF + ',' + yF + ' : ' + JSON.stringify(posibilities));
            } else {
              filling[xF][yF] = noRepeats[Math.floor(Math.random() * noRepeats.length)].value;
            }
          }
        }
      }
    }
  }
  var count = {};
  for (var i = 0; i < filling.length; i++) {
    for (var j = 0; j < filling[i].length; j++) {
      if (count[filling[i][j]]) {
        count[filling[i][j]] += 1;
      } else {
        count[filling[i][j]] = 1;
      }
    }
  }
  var line = '';
  for (var a in count) {
    line += a + ':' + count[a] + ', ';
  }
  if(Debug) console.log(line);
  consoleShowGrid(filling);
  return pieces;
}

function placePiece(grid, piece, pieceId, originalGrid) {
  var placed = false;
  for (var x = 0; !placed && x < grid.length; x++) {
    for (var y = 0; !placed && y < grid[x].length; y++) {
      if (!checkCollision(grid, piece, x, y)) {
        for (var xP = 0; xP < piece.length; xP++) {
          for (var yP = 0; yP < piece[xP].length; yP++) {
            if (piece[xP][yP] !== 0) {
              piece[xP][yP] = originalGrid[x + xP][y + yP];
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
