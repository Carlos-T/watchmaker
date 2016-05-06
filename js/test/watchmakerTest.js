QUnit.test("getParagraph function testing", function(assert) {
  assert.expect(3);

  var paragraph = getParagraph();

  assert.equal(typeof paragraph, "string", "getParagraph returns an string");
  assert.ok(paragraph.length > 120, "getParagraph returns an string with at least 120 characters");

  assert.equal(paragraph, paragraph.replace(/[0-9]/, ''), 'getParagraph returns an string that cannot have numbers');
});

QUnit.test("showGrid function testing", function(assert) {
  assert.expect(4);

  assert.ok($('.crossword').length === 0, "Before calling showGrid, there are no crossword on the body");

  var noParameters = showGrid();

  assert.notOk(noParameters || $('.crossword').length !== 0, "showGrid returns false if called without arguments. Makes no insertion on the body");

  var wrongGrid1 = [[1,2,3,4], [5,6,7,8], 3];
  var wrongGrid2 = [1, 2, 3];
  var wrongArguments = showGrid('test') || showGrid(123) || showGrid('test') || showGrid(wrongGrid1) || showGrid(wrongGrid2);

  assert.notOk(wrongArguments || $('.crossword').length !== 0, "showGrid returns false if called with wrong arguments. Makes no insertion on the body");

  var correctGrid = [[1,2,3,4], [5,6,7,8], [9,10,11,12]];

  var correctCall = showGrid(correctGrid);

  assert.ok(correctCall && $('.crossword').length !== 0, "showGrid returns true if called with correct arguments. Makes an insertion on the body");

  $('.crossword').remove();
});
