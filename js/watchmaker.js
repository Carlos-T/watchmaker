var Debug = true;
function init() {
  var paragraph = getParagraph();
  var grid = createGrid(paragraph);
  var pieces = divideGrid(grid);
  pieces = shufflePieces(pieces);
  var hintGrid = toHints(grid);
  showGrid(hintGrid);
  showPieces(pieces);
}

function getParagraph() {
  var paragraph = "Mi dibujo no representaba un sombrero. Representaba una serpiente boa que digería un elefante. Dibujé entonces el interior de la serpiente boa a fin de que las personas grandes pudiesen comprender. Siempre necesitan explicaciones.";
  var paragraph2 = "Una de sus más importantes habilidades será, siempre, la de extraer de cuanto lo rodea la esencia y la energía que le permitan vivir y crecer artísticamente. Y lo mismo de las personas. Las exprime, utilizando lo mejor de cada una.";
  var paragraph3 = "La verdadera amistad es planta de lento crecimiento que debe sufrir y vencer los embates del infortunio antes de que sus frutos lleguen a completa madurez"; //27
  var paragraph4 = "Habra quien dude que los niños mas encantadores estan en España pero lo que no podra negar nadie es que los mendigos mas pintorescos se encuentran alli Fuenterrabía en aquel dia soleado estaba llena de ellos impresionandome la orgullosa insolencia con que paseaban por las calles"; //44
  return paragraph4;
}

function showGrid(grid) {
  if(grid instanceof Array) {
    var table = $('<table>').addClass('crossword');
    for (var x = 0; x < grid.length; x++) {
      if(grid[x] instanceof Array) {
        var row = $('<tr>');
        for (var y = 0; y < grid[x].length; y++) {
          var element = $('<td>').text(grid[x][y]);
          if (grid[x][y] === ' ' || grid[x][y] === '') {
            element.addClass('whitespace');
          }
          row.append(element);
        }
        table.append(row);
      } else {
        return false;
      }
    }
    $('body').append(table);
    return true;
  } else {
    return false;
  }
}

function showPiece(piece) {
  var table = $('<table>');
  table.addClass('piece');
  for (var x = 0; x < piece.length; x++) {
    var row = $('<tr>');
    for (var y = 0; y < piece[x].length; y++) {
      var element = $('<td>').text(piece[x][y]);
      if (piece[x][y] === ' ' || piece[x][y] === '') {
        element.addClass('whitespace');
      }
      if (piece[x][y] === 0) {
        element.text('');
        element.addClass('void');
      }
      row.append(element);
    }
    table.append(row);
  }
  table.on('mousedown', tableDragged);
  $('body').append(table);
}

function consoleShowGrid(grid) {
  if(Debug) {
    var displayGrid = [];
    for (var x in grid) {
      displayGrid.push('');
      for (var y in grid[x]) {
        displayGrid[x] += grid[x][y] < 10 ? '  ' + grid[x][y] : typeof grid[x][y] === 'string' ? '  ' + grid[x][y] : ' ' + grid[x][y];
      }
    }
    console.log('');
    for (var xG in displayGrid) {
      console.log(displayGrid[xG] + '  -  ' + xG);
    }
  }
}

function shufflePieces(pieces) {
  var shuffled = [];
  var length = pieces.length;
  var rand;

  while (length) {
    rand = Math.floor(Math.random() * length--);
    shuffled.push(pieces.splice(rand, 1)[0]);
  }

  return shuffled;
}

function showPieces(pieces) {
  for(var i in pieces) {
    showPiece(pieces[i]);
  }
}

function toHints(grid) {
  var hints = [];
  for (var x in grid) {
    var row = [];
    for (var y in grid[x]) {
      if(x == y || grid[x].length - x == y || grid[x].length + y == x) {
        row.push(grid[x][y]);
      } else {
        row.push('  ');
      }
    }
    hints.push(row);
  }
  return hints;
}

function tableDragged(e) {
  if (!$(e.target).hasClass('void')) {
    var table = $(e.target).parents('table')
    console.log(table[0].getBoundingClientRect());
    var dX = e.clientX - table[0].getBoundingClientRect().x;
    var dY = e.clientY - table[0].getBoundingClientRect().y;
    console.log('e.clientX', e.clientX);
    console.log('e.target.getBoundingClientRect().x', e.target.getBoundingClientRect().x);
    
    console.log('dX', dX);
    console.log('dY', dY);
    
    table.addClass('moving');
    $(document).on('mouseup', tableReleased);
    $(document).on('mousemove', tableMoved);
    $('.moving').css('left', e.clientX - dX - 20);
    $('.moving').css('top', e.clientY - dY - 20);
  }
}

function tableMoved(e) {
  console.log($('.moving')[0].getBoundingClientRect().x);
  $('.moving').css('left', parseInt($('.moving').css('left')) + e.originalEvent.movementX);
  $('.moving').css('top', parseInt($('.moving').css('top')) + e.originalEvent.movementY);
}

function tableReleased(e) {
  // $('.moving').css('left', '')
  // $('.moving').css('top', '')
  $('.moving').addClass('moved');
  $('.moving').removeClass('moving');
  $(document).off('mouseup', tableReleased);
  $(document).off('mousemove', tableMoved);
  $(e.target).removeClass('moving');
}