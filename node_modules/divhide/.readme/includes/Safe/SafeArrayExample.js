
var Safe = Divhide.Safe;

var value = Safe.array(1);
expect(value)
    .equals([1]);

var value = Safe.array(1);
expect(value)
    .equals([1]);

var value = Safe.array([1, 2]);
expect(value)
    .equals([1, 2]);

var value = Safe.array(null, [ 1, 2 ]);
expect(value)
    .equals([1, 2]);

var value = Safe.array("1", [1, 2]);
expect(value)
    .equals(["1"]);
