QUnit.test("sampleBlocks function testing", function(assert) {
  assert.expect(6);

  var samples = sampleBlocks();

  assert.ok(samples instanceof Array, "sampleBlocks returns an array");
  assert.ok(samples.length > 0, "sampleBlocks returns an array with at least one item");

  var allArrays = true;
  for (var s1 in samples) {
    if (!(samples[s1] instanceof Array)) {
      allArrays = false;
    }
  }
  assert.ok(allArrays, "Every sample must be an array");

  var allArraysOfArrays = true;
  for (var s21 in samples) {
    for (var s22 in samples[s21]) {
      if (!(samples[s21][s22] instanceof Array)) {
        allArraysOfArrays = false;
      }
    }
  }
  assert.ok(allArraysOfArrays, "Every sample must be an array of arrays");

  var allNumbers = true;
  for (var s31 in samples) {
    for (var s32 in samples[s31]) {
      for (var s33 in samples[s31][s32]) {
        if (!(typeof samples[s31][s32][s33] === "number" && (samples[s31][s32][s33] === 0 || samples[s31][s32][s33] === 1))) {
          allNumbers = false;
        }
      }
    }
  }
  assert.ok(allNumbers, "Every position of the sample must be a number zero or one");

  var oneOne = true;
  for (var s41 in samples) {
    var onlyZerosPiece = true;
    for (var s42 in samples[s41]) {
      for (var s43 in samples[s41][s42]) {
        if (samples[s41][s42][s43] === 1) {
          onlyZerosPiece = false;
        }
      }
    }
    oneOne = oneOne && !onlyZerosPiece;
  }
  assert.ok(oneOne, "Every piece must have at least one 1");
});
