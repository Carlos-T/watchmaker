QUnit.test("getParagraph function testing", function(assert) {
  assert.expect(3);

  assert.equal(typeof getParagraph(), "string", "getParagraph returns an string");
  assert.ok(getParagraph().length > 120, "getParagraph returns an string with at least 120 characters");

  var paragraph = getParagraph();
  assert.equal(paragraph, paragraph.replace(/[0-9]/, ''), 'getParagraph returns an string that cannot have numbers');
});
