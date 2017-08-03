
var Safe = Divhide.Safe;

var value = Safe.length([1, 2]);
expect(value).toBe(2);

var value = Safe.length({ one: 1, two: 2});
expect(value).toBe(2);

var value = Safe.length(2);
expect(value).toBe(2);

var value = Safe.length("hello");
expect(value).toBe(5);
